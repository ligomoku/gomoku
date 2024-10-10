namespace GomokuServer.Application.Games.Interfaces;

public interface IGamesRepository : IPaginatedRepository<Game>
{
	Task<Result<Game>> GetAsync(string id);

	Task<Result> SaveAsync(Game game);

	Task<Result<IEnumerable<Game>>> GetByExpressionAsync(
		Expression<Func<Game, bool>> expression,
		Func<IQueryable<Game>, IOrderedQueryable<Game>>? orderBy = null
	);
}
