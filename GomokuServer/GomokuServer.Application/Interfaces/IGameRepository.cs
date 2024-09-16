namespace GomokuServer.Application.Interfaces;

public interface IGameRepository
{
	Task<Result<Game>> GetAsync(string id);

	Task<Result> SaveAsync(Game game);
}
