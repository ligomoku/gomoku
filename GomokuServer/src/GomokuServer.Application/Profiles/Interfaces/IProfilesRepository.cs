using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.Profiles.Interfaces;

public interface IProfilesRepository
{
	Task<Result<Profile>> GetAsync(string id);
}
