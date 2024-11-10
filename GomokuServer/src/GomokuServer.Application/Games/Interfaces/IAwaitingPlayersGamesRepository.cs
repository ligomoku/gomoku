namespace GomokuServer.Application.Games.Interfaces;

public interface IAwaitingPlayersGamesRepository : IPaginatedRepository<AwaitingPlayersGame>
{
	Task<Result<AwaitingPlayersGame>> GetAsync(Guid id);

	Task<Result> SaveAsync(AwaitingPlayersGame game);

	Task<Result<IEnumerable<AwaitingPlayersGame>>> GetByExpressionAsync(
		Expression<Func<AwaitingPlayersGame, bool>> expression,
		Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>? orderBy = null
	);
}
