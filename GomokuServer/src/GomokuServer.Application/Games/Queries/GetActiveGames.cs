using GomokuServer.Core.Games.Enums;

namespace GomokuServer.Application.Games.Queries;

public record GetActiveGamesQuery
	: IPaginatedQuery<PaginatedResponse<IEnumerable<GetActiveGamesResponse>>>
{
	public required bool IsAnonymous { get; init; }
	public int Limit { get; init; } = 5;
	public int Offset { get; init; } = 0;
}

public class GetActiveGamesQueryHandler
	: IQueryHandler<GetActiveGamesQuery, PaginatedResponse<IEnumerable<GetActiveGamesResponse>>>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymousGamesRepository _anonymousGamesRepository;

	public GetActiveGamesQueryHandler(
		IRegisteredGamesRepository gameRepository,
		IAnonymousGamesRepository anonymousGamesRepository
	)
	{
		_registeredGamesRepository = gameRepository;
		_anonymousGamesRepository = anonymousGamesRepository;
	}

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

				return new GetActiveGamesResponse(game.GameId) { Opponent = opponentDto };
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
