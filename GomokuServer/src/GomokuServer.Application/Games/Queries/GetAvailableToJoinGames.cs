namespace GomokuServer.Application.Games.Queries;

public record GetAvailableToJoinGamesQuery
	: PaginatedQuery<IEnumerable<GetAvailableGamesResponse>>
{
	public required bool IsAnonymous { get; init; }
}

public class GetAvailableToJoinGamesQueryHandler(IRegisteredGamesRepository _registeredGamesRepository, IAnonymousGamesRepository _anonymousGamesRepository)
	: IQueryHandler<GetAvailableToJoinGamesQuery, PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>
{
	public async Task<Result<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>>
	Handle(GetAvailableToJoinGamesQuery request, CancellationToken cancellationToken)
	{
		return request.IsAnonymous
			? await TryGetGames(_anonymousGamesRepository, request)
			: await TryGetGames(_registeredGamesRepository, request);
	}

	private async Task<Result<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>> TryGetGames(IGamesRepository gamesRepository, GetAvailableToJoinGamesQuery request)
	{
		Expression<Func<Game, bool>> expression =
			game => game.Status == GameStatus.WaitingForPlayersToJoin;

		var availableGamesCount = await gamesRepository.CountAsync(expression);

		var getAvailableGamesResult = await gamesRepository.GetByExpressionAsync(expression,
		query => query
				.Skip(request.Offset)
				.Take(request.Limit)
				.OrderByDescending(game => game.CreatedAt)
		);


		return getAvailableGamesResult.Map(games =>
		{
			var availableGames = games.Select(game =>
			{
				var opponentDto = game.Opponents.Count > 0 ? new ProfileDto(game.Opponents[0].Id, game.Opponents[0].UserName) : null;

				var timeControl = game is GameWithTimeControl gameWithTimeControl
					? gameWithTimeControl.TimeControl.ToDto()
					: null;

				return new GetAvailableGamesResponse(game.GameId) { Opponent = opponentDto, TimeControl = timeControl };
			}).ToList();

			return new PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>()
			{
				Data = availableGames,
				Metadata = new PaginationMetadata
				{
					HasMoreItems = request.Offset + request.Limit < availableGamesCount,
					TotalCount = availableGamesCount
				}
			};
		});
	}
}
