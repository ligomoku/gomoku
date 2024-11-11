namespace GomokuServer.Application.Games.Queries.Abstract;

public abstract record GetAvailableToJoinGamesQuery : PaginatedQuery<IEnumerable<GetAvailableGamesResponse>>;

public abstract class GetAvailableToJoinGamesQueryHandler<TRequest>(IPlayersAwaitingGameRepository _awaitingPlayersGamesRepository)
	: PaginatedQueryHandler<TRequest, IEnumerable<GetAvailableGamesResponse>>
	where TRequest : GetAvailableToJoinGamesQuery
{
	public override async Task<Result<IEnumerable<GetAvailableGamesResponse>>> GetDataAsync(TRequest request)
	{
		var getAwaitingPlayersGamesResult = await _awaitingPlayersGamesRepository.GetByExpressionAsync(Expression,
			query => query
				.Skip(request.Offset)
				.Take(request.Limit)
				.OrderByDescending(game => game.CreatedAt)
		);

		return getAwaitingPlayersGamesResult.Map(games =>
			games.Select(game =>
			{
				var opponentDto = game.Opponents.Count > 0 ? new ProfileDto(game.Opponents[0].Id, game.Opponents[0].UserName) : null;

				var timeControl = game.GameSettings.TimeControl != null
					? game.GameSettings.TimeControl.ToDto()
					: null;

				return new GetAvailableGamesResponse(game.GameId.ToString()) { Opponent = opponentDto, TimeControl = timeControl };
			}));
	}

	public override async Task<Result<int>> GetTotalItemsAsync(TRequest _)
	{
		return await _awaitingPlayersGamesRepository.CountAsync(Expression);
	}

	private Expression<Func<PlayersAwaitingGame, bool>> Expression => _ => true;
}
