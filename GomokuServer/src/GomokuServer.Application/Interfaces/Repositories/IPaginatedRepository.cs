using System.Linq.Expressions;

namespace GomokuServer.Application.Interfaces.Repositories;

public interface IPaginatedRepository
{
	Task<int> CountAsync(Expression<Func<Game, bool>>? expression = null);
}
