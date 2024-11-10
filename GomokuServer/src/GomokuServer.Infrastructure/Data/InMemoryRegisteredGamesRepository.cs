using System.Collections.Concurrent;
using System.Linq.Expressions;

using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Infrastructure.Data;

public class InMemoryRegisteredGamesRepository : IRegisteredGamesRepository
{
	private readonly ConcurrentDictionary<Guid, Game> _games = new();

	public Task<Result<Game>> GetAsync(Guid id)
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

	public Task<Result<IEnumerable<Game>>> GetByExpressionAsync(Expression<Func<Game, bool>> expression, Func<IQueryable<Game>, IOrderedQueryable<Game>>? orderBy = null)
	{
		var query = _games.Values.AsQueryable().Where(expression);

		if (orderBy != null)
		{
			query = orderBy(query);
		}

		var filteredGames = query.AsEnumerable();

		return filteredGames.Any()
			? Task.FromResult(Result.Success(filteredGames))
			: Task.FromResult(Result.Success(Enumerable.Empty<Game>()));
	}

	public Task<Result<int>> CountAsync(Expression<Func<Game, bool>>? expression = null)
	{
		var query = _games.Values.AsQueryable();

		if (expression != null)
		{
			query = query.Where(expression);
		}

		var count = query.Count();
		return Task.FromResult(Result.Success(count));
	}
}
