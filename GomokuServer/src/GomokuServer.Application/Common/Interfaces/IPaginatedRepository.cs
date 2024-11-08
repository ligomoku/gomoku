namespace GomokuServer.Application.Common.Interfaces;

public interface IPaginatedRepository<T>
{
	Task<Result<int>> CountAsync(Expression<Func<T, bool>>? expression = null);
}
