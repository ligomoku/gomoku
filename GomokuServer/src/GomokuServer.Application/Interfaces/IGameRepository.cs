namespace GomokuServer.Application.Interfaces;

public interface IGameRepository
{
	Task<Result<Game>> GetAsync(string id);

	Task<Result<IEnumerable<Game>>> GetAvailableGamesAsync();

	Task<Result> SaveAsync(Game game);
}
