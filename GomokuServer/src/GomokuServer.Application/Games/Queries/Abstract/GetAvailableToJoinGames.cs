namespace GomokuServer.Application.Games.Queries.Abstract;

public abstract record GetAvailableToJoinGamesQuery : PaginatedQuery<IEnumerable<GetAvailableGamesResponse>>;

public abstract class GetAvailableToJoinGamesQueryHandler<TRequest>(IGamesRepository _gamesRepository)
	: PaginatedQueryHandler<TRequest, IEnumerable<GetAvailableGamesResponse>>
	where TRequest : GetAvailableToJoinGamesQuery
{
	public override async Task<Result<IEnumerable<GetAvailableGamesResponse>>> GetDataAsync(TRequest request)
	{
		var getAvailableGamesResult = await _gamesRepository.GetByExpressionAsync(Expression,
			query => query
				.Skip(request.Offset)
				.Take(request.Limit)
				.OrderByDescending(game => game.CreatedAt)
		);

		return getAvailableGamesResult.Map(games =>
			games.Select(game =>
			{
				var opponentDto = game.Opponents.Count > 0 ? new ProfileDto(game.Opponents[0].Id, game.Opponents[0].UserName) : null;

				var timeControl = game is GameWithTimeControl gameWithTimeControl
					? gameWithTimeControl.TimeControl.ToDto()
					: null;

				return new GetAvailableGamesResponse(game.GameId) { Opponent = opponentDto, TimeControl = timeControl };
			}));
	}

	public override async Task<Result<int>> GetTotalItemsAsync(TRequest _)
	{
		return await _gamesRepository.CountAsync(Expression);
	}

	private Expression<Func<Game, bool>> Expression => game => game.Status == GameStatus.WaitingForPlayersToJoin;
}
