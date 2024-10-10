namespace GomokuServer.Application.Games.Queries;

public class GetGamesByUsernameQuery
	: IPaginatedQuery<PaginatedResponse<IEnumerable<GetGamesByUsernameResponse>>>
{
	[Required]
	public required string UserName { get; set; }
	public int Limit { get; init; } = 5;
	public int Offset { get; init; } = 0;
}

public class GetGamesByUsernameQueryHandler
	: IQueryHandler<GetGamesByUsernameQuery, PaginatedResponse<IEnumerable<GetGamesByUsernameResponse>>>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;

	public GetGamesByUsernameQueryHandler(IRegisteredGamesRepository registeredGamesRepository)
	{
		_registeredGamesRepository = registeredGamesRepository;
	}

	public async Task<Result<PaginatedResponse<IEnumerable<GetGamesByUsernameResponse>>>>
		Handle(GetGamesByUsernameQuery request, CancellationToken cancellationToken)
	{
		Expression<Func<Game, bool>> expression =
			game => game.Opponents.Any(opponent => opponent.UserName == request.UserName);

		var availableGamesCount = await _registeredGamesRepository.CountAsync(expression);

		var gamesByUsernameResult = await _registeredGamesRepository
			.GetByExpressionAsync(expression,
				query => query
					.Skip(request.Offset)
					.Take(request.Limit)
					.OrderBy(game => game.Winner == null)
					.ThenByDescending(game => game.CreatedAt)
			);

		return gamesByUsernameResult.Map(games => new PaginatedResponse<IEnumerable<GetGamesByUsernameResponse>>()
		{
			Data = games.Select(game => new GetGamesByUsernameResponse
			{
				GameId = game.GameId,
				Players = new UsernamesDto() { Black = game.Players.Black?.UserName, White = game.Players.White?.UserName },
				Gen = game.PositionInGENFormat,
				Winner = game.Winner?.UserName,
				Date = game.CreatedAt,
			}),
			Metadata = new()
			{
				HasMoreItems = request.Offset + request.Limit < availableGamesCount,
				TotalCount = availableGamesCount
			}
		});
	}
}
