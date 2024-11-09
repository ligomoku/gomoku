using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.Profiles.Interfaces;

public interface IProfilesRepository
{
	Task<Result<Profile>> GetAsync(string id);
	Task<Result<IEnumerable<Profile>>> SearchAsync(string query, int limit, int offset);
}
