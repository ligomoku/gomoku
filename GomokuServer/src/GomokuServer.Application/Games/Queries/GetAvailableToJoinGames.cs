using GomokuServer.Application.Interfaces.Common;
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
				var opponent = game.Opponents[0];
				var opponentDto = new PlayerDto(opponent.Id, opponent.UserName, opponent.Color.ToString());

				return new GetAvailableGamesResponse(game.GameId, opponentDto);
			}
			));

		return mappedResult;
	}
}
