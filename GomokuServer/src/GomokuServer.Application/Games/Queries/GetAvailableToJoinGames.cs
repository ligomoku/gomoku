namespace GomokuServer.Application.Games.Queries;

public record GetAvailableToJoinGamesQuery
	: IPaginatedQuery<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>
{
	public required bool IsAnonymus { get; init; }
	public int Limit { get; init; } = 5;
	public int Offset { get; init; } = 0;
}

public class GetAvailableToJoinGamesQueryHandler
	: IQueryHandler<GetAvailableToJoinGamesQuery, PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymusGamesRepository _anonymusGamesRepository;

	public GetAvailableToJoinGamesQueryHandler(
		IRegisteredGamesRepository gameRepository,
		IAnonymusGamesRepository anonymusGamesRepository
	)
	{
		_registeredGamesRepository = gameRepository;
		_anonymusGamesRepository = anonymusGamesRepository;
	}

	public async Task<Result<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>>
	Handle(GetAvailableToJoinGamesQuery request, CancellationToken cancellationToken)
	{
		return request.IsAnonymus
			? await TryGetGames(_anonymusGamesRepository, request)
			: await TryGetGames(_registeredGamesRepository, request);
	}

	private async Task<Result<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>> TryGetGames(IGamesRepository gamesRepository, GetAvailableToJoinGamesQuery request)
	{
		Expression<Func<Game, bool>> expression =
			game => !game.HasBothPlayersJoined;

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
				var opponent = game.Opponents[0];
				var opponentDto = new ProfileDto(opponent.Id, opponent.UserName);

				return new GetAvailableGamesResponse(game.GameId, opponentDto);
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
