using System.Collections.Concurrent;
using System.Linq.Expressions;

using Ardalis.Result;

using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Application.FunctionalTests.Infrastructure;

public class TestsAnonymousPlayersAwaitingGameRepository : IAnonymousPlayersAwaitingGameRepository
{
	private readonly ConcurrentDictionary<Guid, PlayersAwaitingGame> _games = new();

	public Task<Result<PlayersAwaitingGame>> GetAsync(Guid id)
	{
		if (_games.TryGetValue(id, out var game))
		{
			return Task.FromResult(Result.Success(game));
		}

		return Task.FromResult(Result<PlayersAwaitingGame>.NotFound("Game not found"));
	}

	public Task<Result> SaveAsync(PlayersAwaitingGame game)
	{
		_games[game.GameId] = game;
		return Task.FromResult(Result.Success());
	}

	public Task<Result<int>> CountAsync(Expression<Func<PlayersAwaitingGame, bool>>? expression = null)
	{
		var query = _games.Values.AsQueryable();

		if (expression != null)
		{
			query = query.Where(expression);
		}

		var count = query.Count();
		return Task.FromResult(Result.Success(count));
	}

	public Task<Result<IEnumerable<PlayersAwaitingGame>>> GetByExpressionAsync(Expression<Func<PlayersAwaitingGame, bool>> expression, Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>? orderBy = null)
	{
		var query = _games.Values.AsQueryable().Where(expression);

		if (orderBy != null)
		{
			query = orderBy(query);
		}

		var filteredGames = query.AsEnumerable();

		return filteredGames.Any()
			? Task.FromResult(Result.Success(filteredGames))
			: Task.FromResult(Result.Success(Enumerable.Empty<PlayersAwaitingGame>()));
	}

	public Task<Result> DeleteAsync(Guid id)
	{
		_games.TryRemove(id, out _);
		return Task.FromResult(Result.Success());
	}
}
