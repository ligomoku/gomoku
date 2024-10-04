using System.Linq.Expressions;

namespace GomokuServer.Application.Interfaces;

public interface IGameRepository : IPaginatedRepository<Game>
{
	Task<Result<Game>> GetAsync(string id);

	Task<Result> SaveAsync(Game game);

	Task<Result<IEnumerable<Game>>> GetByExpressionAsync(
		Expression<Func<Game, bool>> expression,
		Func<IQueryable<Game>, IOrderedQueryable<Game>>? orderBy = null
	);
}
