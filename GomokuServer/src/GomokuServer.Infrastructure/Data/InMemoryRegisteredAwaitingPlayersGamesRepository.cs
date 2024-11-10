using System.Collections.Concurrent;
using System.Linq.Expressions;

using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Infrastructure.Data;

public class InMemoryRegisteredAwaitingPlayersGamesRepository : IRegisteredAwaitingPlayersGamesRepository
{
	private readonly ConcurrentDictionary<Guid, AwaitingPlayersGame> _games = new();

	public Task<Result<AwaitingPlayersGame>> GetAsync(Guid id)
	{
		if (_games.TryGetValue(id, out var game))
		{
			return Task.FromResult(Result.Success(game));
		}

		return Task.FromResult(Result<AwaitingPlayersGame>.NotFound());
	}

	public Task<Result> SaveAsync(AwaitingPlayersGame game)
	{
		_games[game.GameId] = game;
		return Task.FromResult(Result.Success());
	}

	public Task<Result<int>> CountAsync(Expression<Func<AwaitingPlayersGame, bool>>? expression = null)
	{
		var query = _games.Values.AsQueryable();

		if (expression != null)
		{
			query = query.Where(expression);
		}

		var count = query.Count();
		return Task.FromResult(Result.Success(count));
	}

	public Task<Result<IEnumerable<AwaitingPlayersGame>>> GetByExpressionAsync(Expression<Func<AwaitingPlayersGame, bool>> expression, Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>? orderBy = null)
	{
		var query = _games.Values.AsQueryable().Where(expression);

		if (orderBy != null)
		{
			query = orderBy(query);
		}

		var filteredGames = query.AsEnumerable();

		return filteredGames.Any()
			? Task.FromResult(Result.Success(filteredGames))
			: Task.FromResult(Result.Success(Enumerable.Empty<AwaitingPlayersGame>()));
	}
}
