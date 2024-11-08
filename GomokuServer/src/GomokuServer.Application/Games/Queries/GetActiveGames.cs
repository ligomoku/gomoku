namespace GomokuServer.Application.Games.Queries;

public record GetActiveGamesQuery
	: PaginatedQuery<IEnumerable<GetActiveGamesResponse>>
{
	public required bool IsAnonymous { get; init; }
}

public class GetActiveGamesQueryHandler(IRegisteredGamesRepository _registeredGamesRepository, IAnonymousGamesRepository _anonymousGamesRepository)
	: IQueryHandler<GetActiveGamesQuery, PaginatedResponse<IEnumerable<GetActiveGamesResponse>>>
{
	public async Task<Result<PaginatedResponse<IEnumerable<GetActiveGamesResponse>>>>
		Handle(GetActiveGamesQuery request, CancellationToken cancellationToken)
	{
		return request.IsAnonymous
			? await TryGetGames(_anonymousGamesRepository, request)
			: await TryGetGames(_registeredGamesRepository, request);
	}

	private async Task<Result<PaginatedResponse<IEnumerable<GetActiveGamesResponse>>>> TryGetGames(IGamesRepository gamesRepository, GetActiveGamesQuery request)
	{
		Expression<Func<Game, bool>> expression =
			game => game.Status == GameStatus.InProgress;

		var activeGamesCount = await gamesRepository.CountAsync(expression);

		var getActiveGamesResult = await gamesRepository.GetByExpressionAsync(expression,
		query => query
				.Skip(request.Offset)
				.Take(request.Limit)
				.OrderByDescending(game => game.CreatedAt)
		);

		return getActiveGamesResult.Map(games =>
		{
			var activeGames = games.Select(game =>
			{
				var opponentDto = game.Opponents.Count > 0 ? new ProfileDto(game.Opponents[0].Id, game.Opponents[0].UserName) : null;

				var timeControl = game is GameWithTimeControl gameWithTimeControl
					? gameWithTimeControl.TimeControl.ToDto()
					: null;

				return new GetActiveGamesResponse(game.GameId) { Opponent = opponentDto, TimeControl = timeControl };
			}).ToList();

			return new PaginatedResponse<IEnumerable<GetActiveGamesResponse>>()
			{
				Data = activeGames,
				Metadata = new PaginationMetadata
				{
					HasMoreItems = request.Offset + request.Limit < activeGamesCount,
					TotalCount = activeGamesCount
				}
			};
		});
	}
}
