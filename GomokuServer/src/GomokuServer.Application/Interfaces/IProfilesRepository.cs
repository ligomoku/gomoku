namespace GomokuServer.Application.Interfaces;

public interface IProfilesRepository
{
	Task<Result<Profile>> GetAsync(string id);
}
