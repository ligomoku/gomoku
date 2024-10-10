namespace GomokuServer.Application.Common.Interfaces;

public interface ICacheService
{
	Task<T> GetOrCreateAsync<T>(string key, Func<CancellationToken, Task<T>> factory, CancellationToken cancellationToken);

	Task CreateAsync<T>(string key, T value, CancellationToken cancellationToken);
}
