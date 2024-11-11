namespace GomokuServer.Application.Games.Queries.Abstract;

public abstract record GetAvailableToJoinGamesQuery : PaginatedQuery<IEnumerable<GetAvailableGamesResponse>>;

public abstract class GetAvailableToJoinGamesQueryHandler<TRequest>(IPlayersAwaitingGameRepository _playersAwaitingGameRepository)
	: PaginatedQueryHandler<TRequest, IEnumerable<GetAvailableGamesResponse>>
	where TRequest : GetAvailableToJoinGamesQuery
{
	public override async Task<Result<IEnumerable<GetAvailableGamesResponse>>> GetDataAsync(TRequest request)
	{
		var getAwaitingPlayersGamesResult = await _playersAwaitingGameRepository.GetByExpressionAsync(Expression,
			query => query
				.Skip(request.Offset)
				.Take(request.Limit)
				.OrderByDescending(game => game.CreatedAt)
		);

		return getAwaitingPlayersGamesResult.Map(games =>
			games.Select(game =>
			{
				var opponentDto = game.Opponents.Count > 0 ? new ProfileDto(game.Opponents[0].Id, game.Opponents[0].UserName) : null;

				return new GetAvailableGamesResponse(game.GameId.ToString())
				{
					Opponent = opponentDto,
					TimeControl = game.GameSettings.TimeControl?.ToDto()
				};
			}));
	}

	public override async Task<Result<int>> GetTotalItemsAsync(TRequest _)
	{
		return await _playersAwaitingGameRepository.CountAsync(Expression);
	}

	private Expression<Func<PlayersAwaitingGame, bool>> Expression => players => players.Opponents.Count < 2;
}
