using GomokuServer.Application.Responses;

namespace GomokuServer.Application.Games.Queries;

public record GetAvailableToJoinGamesQuery : IQuery<IEnumerable<GetAvailableGamesResponse>>;

public class GetAvailableToJoinGamesQueryHandler : IQueryHandler<GetAvailableToJoinGamesQuery, IEnumerable<GetAvailableGamesResponse>>
{
	private readonly IGameRepository _gameRepository;

	public GetAvailableToJoinGamesQueryHandler(IGameRepository gameRepository)
	{
		_gameRepository = gameRepository;
	}

	public async Task<Result<IEnumerable<GetAvailableGamesResponse>>> Handle(GetAvailableToJoinGamesQuery request, CancellationToken cancellationToken)
	{
		var getAvailableGamesResult = await _gameRepository.GetByExpressionAsync(game => !game.HasBothPlayersJoined, query => query.OrderByDescending(game => game.CreatedAt));

		var mappedResult =
			getAvailableGamesResult.Map(games => games.Select(game =>
			{
				PlayerDto opponent = game.PlayerOne != null
					? new PlayerDto(game.PlayerOne.Id, game.PlayerOne.UserName)
					: new PlayerDto(game.PlayerTwo!.Id, game.PlayerTwo!.UserName);

				return new GetAvailableGamesResponse(game.GameId, opponent);
			}
			));

		return mappedResult;
	}
}
