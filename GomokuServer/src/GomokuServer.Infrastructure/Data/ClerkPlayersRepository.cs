using GomokuServer.Core.Entities;
using GomokuServer.Infrastructure.Api;

using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace GomokuServer.Infrastructure.Data;

public class ClerkPlayersRepository : IPlayersRepository
{
	private readonly IClerkBackendApi _clerkBackendApiHttpClient;
	private readonly IMemoryCache _memoryCache;
	private readonly ILogger<ClerkPlayersRepository> _logger;

	public ClerkPlayersRepository(IClerkBackendApi clerkBackendApiHttpClient, IMemoryCache memoryCache, ILogger<ClerkPlayersRepository> logger)
	{
		_clerkBackendApiHttpClient = clerkBackendApiHttpClient;
		_memoryCache = memoryCache;
		_logger = logger;
	}

	public async Task<Result<Player>> GetAsync(string id)
	{
		try
		{
			var clerkUser = await _memoryCache.GetOrCreateAsync(id, async entry =>
			{
				entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
				return await _clerkBackendApiHttpClient.GetUserByIdAsync(id);
			});

			return Result.Success(new Player(id, clerkUser!.Username));
		}
		catch (ApiException apiException) 
		{
			_logger.LogError(apiException, apiException.Message);
			return Result.Error();
		}
	}
}
