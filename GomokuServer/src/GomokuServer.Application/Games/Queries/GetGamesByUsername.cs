namespace GomokuServer.Application.Games.Queries;

public record GetGamesByUsernameQuery
	: PaginatedQuery<IEnumerable<GetGamesByUsernameResponse>>
{
	[Required]
	public required string UserName { get; set; }
}

public class GetGamesByUsernameQueryHandler(IRegisteredGamesRepository _registeredGamesRepository)
	: PaginatedQueryHandler<GetGamesByUsernameQuery, IEnumerable<GetGamesByUsernameResponse>>
{
	public override async Task<Result<IEnumerable<GetGamesByUsernameResponse>>> GetDataAsync(GetGamesByUsernameQuery request)
	{
		var gamesByUsernameResult = await _registeredGamesRepository
			.GetByExpressionAsync(GetExpression(request),
				query => query
					.Skip(request.Offset)
					.Take(request.Limit)
					.OrderBy(game => game.Winner == null)
					.ThenByDescending(game => game.CreatedAt)
			);

		return gamesByUsernameResult.Map(games => games.Select(game =>
		{
			var (timeControl, clock) = game is GameWithTimeControl gameWithTimeControl
				? (gameWithTimeControl.TimeControl.ToDto(), new ClockDto(gameWithTimeControl.BlackRemainingTimeInMilliseconds / 1000, gameWithTimeControl.WhiteRemainingTimeInMilliseconds / 1000))
				: (null, null);

			return new GetGamesByUsernameResponse
			{
				GameId = game.GameId,
				Players = new UsernamesDto() { Black = game.Players.Black?.UserName, White = game.Players.White?.UserName },
				IsCompleted = game.Status == GameStatus.Completed,
				Gen = game.PositionInGENFormat,
				Winner = game.Winner?.UserName,
				Date = game.CreatedAt,
				TimeControl = timeControl,
				Clock = clock
			};
		}));
	}

	public override async Task<Result<int>> GetTotalItemsAsync(GetGamesByUsernameQuery request)
	{
		return await _registeredGamesRepository.CountAsync(GetExpression(request));
	}

	private Expression<Func<Game, bool>> GetExpression(GetGamesByUsernameQuery request)
		=> game => game.Opponents.Any(opponent => opponent.UserName == request.UserName);
}
