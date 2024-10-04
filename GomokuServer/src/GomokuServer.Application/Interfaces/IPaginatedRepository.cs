using System.Linq.Expressions;

namespace GomokuServer.Application.Interfaces;

public interface IPaginatedRepository
{
	Task<int> CountAsync(Expression<Func<Game, bool>>? expression = null);
}
