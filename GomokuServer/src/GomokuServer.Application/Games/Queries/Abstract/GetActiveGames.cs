namespace GomokuServer.Application.Games.Queries.Abstract;

public abstract record GetActiveGamesQuery : PaginatedQuery<IEnumerable<GetActiveGamesResponse>>;

public abstract class GetActiveGamesQueryHandler<TRequest>(IGamesRepository _gamesRepository)
	: PaginatedQueryHandler<TRequest, IEnumerable<GetActiveGamesResponse>>
	where TRequest : PaginatedQuery<IEnumerable<GetActiveGamesResponse>>
{
	public override async Task<Result<IEnumerable<GetActiveGamesResponse>>> GetDataAsync(TRequest request)
	{
		var getActiveGamesResult = await _gamesRepository.GetByExpressionAsync(Expression,
			query => query
				.Skip(request.Offset)
				.Take(request.Limit)
				.OrderByDescending(game => game.CreatedAt)
		);

		return getActiveGamesResult.Map(games =>
			games.Select(game =>
			{
				var opponentDto = game.Opponents.Count > 0 ? new ProfileDto(game.Opponents[0].Id, game.Opponents[0].UserName) : null;

				var timeControl = game is GameWithTimeControl gameWithTimeControl
					? gameWithTimeControl.TimeControl.ToDto()
					: null;

				return new GetActiveGamesResponse(game.GameId) { Opponent = opponentDto, TimeControl = timeControl };
			}));
	}

	public override async Task<Result<int>> GetTotalItemsAsync(TRequest _)
	{
		return await _gamesRepository.CountAsync(Expression);
	}

	private Expression<Func<Game, bool>> Expression => game => game.Status == GameStatus.InProgress;
}
