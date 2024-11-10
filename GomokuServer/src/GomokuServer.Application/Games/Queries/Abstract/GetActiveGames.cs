namespace GomokuServer.Application.Games.Queries.Abstract;

public abstract record GetActiveGamesQuery : PaginatedQuery<IEnumerable<GetActiveGamesResponse>>;

public abstract class GetActiveGamesQueryHandler<TRequest>(IGamesRepository _gamesRepository)
	: PaginatedQueryHandler<TRequest, IEnumerable<GetActiveGamesResponse>>
	where TRequest : GetActiveGamesQuery
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
				var timeControl = game is GameWithTimeControl gameWithTimeControl
					? gameWithTimeControl.GameSettings.TimeControl.ToDto()
					: null;

				return new GetActiveGamesResponse(game.GameId.ToString()) { Players = game.GetPlayersDto(), TimeControl = timeControl };
			}));
	}

	public override async Task<Result<int>> GetTotalItemsAsync(TRequest _)
	{
		return await _gamesRepository.CountAsync(Expression);
	}

	private Expression<Func<Game, bool>> Expression => game => game.Status == GameStatus.InProgress;
}
