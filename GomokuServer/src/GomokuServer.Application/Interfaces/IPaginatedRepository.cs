using System.Linq.Expressions;

namespace GomokuServer.Application.Interfaces;

public interface IPaginatedRepository<T>
{
	Task<int> CountAsync(Expression<Func<T, bool>>? expression = null);
}
