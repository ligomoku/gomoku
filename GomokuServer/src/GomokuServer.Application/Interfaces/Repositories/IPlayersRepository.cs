namespace GomokuServer.Application.Interfaces.Repositories;

public interface IPlayersRepository
{
	Task<Result<Player>> GetAsync(string id);
}
