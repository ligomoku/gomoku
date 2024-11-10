namespace GomokuServer.Application.Games.Interfaces;

public interface IGamesRepository : IPaginatedRepository<Game>
{
	Task<Result<Game>> GetAsync(Guid id);

	Task<Result> SaveAsync(Game game);

	Task<Result<IEnumerable<Game>>> GetByExpressionAsync(
		Expression<Func<Game, bool>> expression,
		Func<IQueryable<Game>, IOrderedQueryable<Game>>? orderBy = null
	);
}
