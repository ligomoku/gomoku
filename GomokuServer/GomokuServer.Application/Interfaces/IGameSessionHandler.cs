namespace GomokuServer.Application.Interfaces;

public interface IGameSessionHandler
{
	Task<Result<Game>> GetAsync(string gameId);

	Task<Result<Game>> CreateAsync(int boardSize);

	Task<Result> AddPlayerToGameAsync(string gameId, string playerId);

	Task<Result<TilePlacementResult>> PlaceTileAsync(string gameId, Tile tile, string playerId);
}
