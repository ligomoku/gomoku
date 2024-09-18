using GomokuServer.Application.Responses;
using GomokuServer.Core.Entities;

namespace GomokuServer.Application.Interfaces;

public interface IGameSessionHandler
{
	Task<Result<Game>> GetAsync(string gameId);

	Task<Result<IEnumerable<GetAvailableGamesResponse>>> GetAvailableGamesAsync();

	Task<Result<CreateGameResponse>> CreateAsync(int boardSize);

	Task<Result> AddPlayerToGameAsync(string gameId, string playerId);

	Task<Result<PlaceTileResponse>> PlaceTileAsync(string gameId, Tile tile, string playerId);
}
