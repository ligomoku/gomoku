using GomokuServer.Application.Interfaces.Common;
using GomokuServer.Application.Responses;

namespace GomokuServer.Application.Games.Queries;

public record GetAvailableToJoinGamesQuery
	: IPaginatedQuery<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>
{
	public int Limit { get; init; } = 5;
	public int Offset { get; init; } = 0;
}

public class GetAvailableToJoinGamesQueryHandler
	: IQueryHandler<GetAvailableToJoinGamesQuery, PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>
{
	private readonly IGameRepository _gameRepository;

	public GetAvailableToJoinGamesQueryHandler(IGameRepository gameRepository)
	{
		_gameRepository = gameRepository;
	}

	public async Task<Result<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>>
	Handle(GetAvailableToJoinGamesQuery request, CancellationToken cancellationToken)
	{
		var availableGamesCount = await _gameRepository.CountAsync(game => !game.HasBothPlayersJoined);

		var getAvailableGamesResult = await _gameRepository.GetByExpressionAsync(
			game => !game.HasBothPlayersJoined,
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
				var opponentDto = new PlayerDto(opponent.Id, opponent.UserName, opponent.Color.ToString());

				return new GetAvailableGamesResponse(game.GameId, opponentDto);
			}).ToList();

			bool hasMoreItems = request.Offset + request.Limit < availableGamesCount;

			return new PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>()
			{
				Data = availableGames,
				Metadata = new PaginationMetadata
				{
					HasMoreItem = hasMoreItems,
				}
			};
		});
	}
}
