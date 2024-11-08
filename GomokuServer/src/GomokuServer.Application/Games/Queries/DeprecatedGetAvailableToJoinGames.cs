namespace GomokuServer.Application.Games.Queries;

[Obsolete("Use specific query")]
public record DeprecatedGetAvailableToJoinGamesQuery
	: PaginatedQuery<IEnumerable<GetAvailableGamesResponse>>
{
	public required bool IsAnonymous { get; init; }
}

[Obsolete("Use specific query handler")]
public class DeprecatedGetAvailableToJoinGamesQueryHandler(IRegisteredGamesRepository _registeredGamesRepository, IAnonymousGamesRepository _anonymousGamesRepository)
	: IQueryHandler<DeprecatedGetAvailableToJoinGamesQuery, PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>
{
	public async Task<Result<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>>
	Handle(DeprecatedGetAvailableToJoinGamesQuery request, CancellationToken cancellationToken)
	{
		return request.IsAnonymous
			? await TryGetGames(_anonymousGamesRepository, request)
			: await TryGetGames(_registeredGamesRepository, request);
	}

	private async Task<Result<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>> TryGetGames(IGamesRepository gamesRepository, DeprecatedGetAvailableToJoinGamesQuery request)
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
