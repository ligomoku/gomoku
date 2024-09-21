using System.Collections.Concurrent;

using GomokuServer.Core.Entities;

namespace GomokuServer.Infrastructure.Data;

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

	public Task<Result<IEnumerable<Game>>> GetAvailableGamesAsync()
	{
		var availableGames = _games.Values.Where(game => !game.IsGameStarted).AsEnumerable();

		return availableGames.Any()
			? Task.FromResult(Result.Success(availableGames))
			: Task.FromResult(Result<IEnumerable<Game>>.NotFound());
	}

	public Task<Result> SaveAsync(Game game)
	{
		_games[game.GameId] = game;
		return Task.FromResult(Result.Success());
	}
}
