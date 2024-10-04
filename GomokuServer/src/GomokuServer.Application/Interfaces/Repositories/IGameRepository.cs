using System.Linq.Expressions;

namespace GomokuServer.Application.Interfaces.Repositories;

public interface IGameRepository : IPaginatedRepository
{
	Task<Result<Game>> GetAsync(string id);

	Task<Result> SaveAsync(Game game);

	Task<Result<IEnumerable<Game>>> GetByExpressionAsync(
		Expression<Func<Game, bool>> expression,
		Func<IQueryable<Game>, IOrderedQueryable<Game>>? orderBy = null
	);
}
