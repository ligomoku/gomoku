using GomokuServer.Application.Common.Interfaces;

using Microsoft.Extensions.Caching.Memory;

namespace GomokuServer.Infrastructure.Cache;

public class MemoryCacheService : ICacheService
{
	private readonly IMemoryCache _memoryCache;
	private readonly CacheServiceSettings _cacheServiceSettings;

	public MemoryCacheService(IMemoryCache memoryCache, CacheServiceSettings cacheServiceSettings)
	{
		_memoryCache = memoryCache;
		_cacheServiceSettings = cacheServiceSettings;
	}

	public async Task<T> GetOrCreateAsync<T>(string key, Func<CancellationToken, Task<T>> factory, CancellationToken cancellationToken)
	{
		T? result = await _memoryCache.GetOrCreateAsync(key, entry =>
		{
			entry.SetAbsoluteExpiration(_cacheServiceSettings.TimeToLiveInMinutes);

			return factory(cancellationToken);
		});

		return result!;
	}

	public async Task CreateAsync<T>(string key, T value, CancellationToken cancellationToken)
	{
		await Task.Run(() =>
		{
			var cacheEntryOptions = new MemoryCacheEntryOptions
			{
				AbsoluteExpirationRelativeToNow = _cacheServiceSettings.TimeToLiveInMinutes
			};

			_memoryCache.Set(key, value, cacheEntryOptions);
		}, cancellationToken);
	}
}
