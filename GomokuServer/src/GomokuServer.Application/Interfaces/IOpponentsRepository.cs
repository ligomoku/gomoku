namespace GomokuServer.Application.Interfaces;

public interface IOpponentsRepository
{
	Task<Result<Opponent>> GetAsync(string id);
}
