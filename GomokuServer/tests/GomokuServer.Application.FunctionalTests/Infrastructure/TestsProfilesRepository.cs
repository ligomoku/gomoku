using System.Collections.Concurrent;

using Ardalis.Result;

using GomokuServer.Application.Profiles.Interfaces;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.FunctionalTests.Infrastructure;

public class TestsProfilesRepository : IProfilesRepository
{
	private readonly ConcurrentDictionary<string, Profile> _profiles = new();

	public TestsProfilesRepository()
	{
		_profiles.TryAdd("1", new Profile("1", "User1"));
		_profiles.TryAdd("2", new Profile("2", "User2"));
		_profiles.TryAdd("3", new Profile("3", "User3"));
	}

	public Task<Result<Profile>> GetAsync(string id)
	{
		if (_profiles.TryGetValue(id, out var game))
		{
			return Task.FromResult(Result.Success(game));
		}

		return Task.FromResult(Result<Profile>.NotFound("Game not found"));
	}
}
