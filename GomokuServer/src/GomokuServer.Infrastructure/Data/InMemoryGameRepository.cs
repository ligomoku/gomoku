using System.Collections.Concurrent;
using System.Linq.Expressions;

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

	public Task<Result> SaveAsync(Game game)
	{
		_games[game.GameId] = game;
		return Task.FromResult(Result.Success());
	}

	public Task<Result<IEnumerable<Game>>> GetByExpressionAsync(Expression<Func<Game, bool>> expression)
	{
		var filteredGames = _games.Values.AsQueryable().Where(expression).AsEnumerable();

		return filteredGames.Any()
			? Task.FromResult(Result.Success(filteredGames))
			: Task.FromResult(Result.Success(Enumerable.Empty<Game>()));
	}
}
