using GomokuServer.Core.Entities;
using GomokuServer.Infrastructure.Api;

using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace GomokuServer.Infrastructure.Data;

public class ClerkProfilesRepository : IProfilesRepository
{
	private readonly IClerkBackendApi _clerkBackendApiHttpClient;
	private readonly IMemoryCache _memoryCache;
	private readonly ILogger<ClerkProfilesRepository> _logger;

	public ClerkProfilesRepository(IClerkBackendApi clerkBackendApiHttpClient, IMemoryCache memoryCache, ILogger<ClerkProfilesRepository> logger)
	{
		_clerkBackendApiHttpClient = clerkBackendApiHttpClient;
		_memoryCache = memoryCache;
		_logger = logger;
	}

	public async Task<Result<Profile>> GetAsync(string id)
	{
		if (string.IsNullOrEmpty(id))
		{
			_logger.LogInformation("Anonymous user detected. Returning guest profile.");

			var guestProfile = new Profile(Guid.NewGuid().ToString(), "Guest");
			return Result.Success(guestProfile);
		}

		try
		{
			var clerkUser = await _memoryCache.GetOrCreateAsync(id, async entry =>
			{
				entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
				return await _clerkBackendApiHttpClient.GetUserByIdAsync(id);
			});

			return Result.Success(new Profile(id, clerkUser!.Username));
		}
		catch (ApiException apiException) when (apiException.StatusCode == System.Net.HttpStatusCode.NotFound)
		{
			_logger.LogWarning($"User with ID {id} not found in Clerk API. Returning guest profile.");

			var guestProfile = new Profile(Guid.NewGuid().ToString(), "Guest");
			return Result.Success(guestProfile);
		}
		catch (ApiException apiException)
		{
			_logger.LogError(apiException, $"Failed to fetch user profile: {apiException.Message}");
			return Result.Error();
		}
	}
}
