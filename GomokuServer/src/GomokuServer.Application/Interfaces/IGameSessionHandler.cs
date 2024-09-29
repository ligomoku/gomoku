using GomokuServer.Application.Responses;

namespace GomokuServer.Application.Interfaces;

public interface IGameSessionHandler
{
	Task<Result<GetGameResponse>> GetAsync(string gameId);

	Task<Result<IEnumerable<GetAvailableGamesResponse>>> GetAvailableGamesAsync();

	Task<Result<CreateGameResponse>> CreateAsync(int boardSize, string playerId);

	Task<Result> AddPlayerToGameAsync(string gameId, string playerId);

	Task<Result<PlaceTileResponse>> PlaceTileAsync(string gameId, TileDto tile, string playerId);
}
