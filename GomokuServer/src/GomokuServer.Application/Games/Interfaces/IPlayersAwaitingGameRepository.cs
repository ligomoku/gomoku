namespace GomokuServer.Application.Games.Interfaces;

public interface IPlayersAwaitingGameRepository : IPaginatedRepository<PlayersAwaitingGame>
{
	Task<Result<PlayersAwaitingGame>> GetAsync(Guid id);

	Task<Result> SaveAsync(PlayersAwaitingGame game);

	Task<Result<IEnumerable<PlayersAwaitingGame>>> GetByExpressionAsync(
		Expression<Func<PlayersAwaitingGame, bool>> expression,
		Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>? orderBy = null
	);
}
