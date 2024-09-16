using System.Collections.Concurrent;

using GomokuServer.Core.Entities;

namespace GomokuServer.Infrastructure;

public class InMemoryPlayersRepository : IPlayersRepository
{
	private readonly ConcurrentDictionary<string, Player> _players = new()
	{
		["1"] = new Player("1"),
		["2"] = new Player("2"),
		["3"] = new Player("3"),
		["4"] = new Player("4"),
		["5"] = new Player("5")
	};

	public Task<Result<Player>> GetAsync(string id)
	{
		if (_players.TryGetValue(id, out var player))
		{
			return Task.FromResult(Result.Success(player));
		}

		return Task.FromResult(Result<Player>.NotFound());
	}

	public Task<Result> CreateAsync(string id)
	{
		var player = new Player(id);

		if (_players.TryAdd(id, player))
		{
			return Task.FromResult(Result.Success());
		}

		return Task.FromResult(Result.Invalid(new ValidationError($"Player with ID {id} already exists.")));
	}
}
