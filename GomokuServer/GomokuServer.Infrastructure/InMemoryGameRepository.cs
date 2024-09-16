using System.Collections.Concurrent;

namespace GomokuServer.Infrastructure;

public class InMemoryGameRepository : IGameRepository
{
	private readonly ConcurrentDictionary<string, Game> _games = new();

	public Task<Result<Game>> GetAsync(string id)
	{
		if (_games.TryGetValue(id, out var game))
		{
			return Task.FromResult(Result.Success(game));
		}

		return Task.FromResult(Result<Game>.NotFound());
	}

	public Task<Result> SaveAsync(Game game)
	{
		_games[game.GameId] = game;
		return Task.FromResult(Result.Success());
	}
}
