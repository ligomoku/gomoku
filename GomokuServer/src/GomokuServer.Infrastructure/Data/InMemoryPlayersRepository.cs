using System.Collections.Concurrent;

using GomokuServer.Core.Entities;

namespace GomokuServer.Infrastructure.Data;

public class InMemoryPlayersRepository : IPlayersRepository
{
	private readonly ConcurrentDictionary<string, Player> _players = new()
	{
		["1"] = new Player("1", "UserName1"),
		["2"] = new Player("2", "UserName2"),
		["3"] = new Player("3", "UserName3"),
		["4"] = new Player("4", "UserName4"),
		["5"] = new Player("5", "UserName5")
	};

	public Task<Result<Player>> GetAsync(string id)
	{
		if (_players.TryGetValue(id, out var player))
		{
			return Task.FromResult(Result.Success(player));
		}

		return Task.FromResult(Result<Player>.NotFound());
	}

	public Task<Result> CreateAsync(string id, string userName)
	{
		var player = new Player(id, userName);

		if (_players.TryAdd(id, player))
		{
			return Task.FromResult(Result.Success());
		}

		return Task.FromResult(Result.Invalid(new ValidationError($"Player with ID {id} already exists.")));
	}
}
