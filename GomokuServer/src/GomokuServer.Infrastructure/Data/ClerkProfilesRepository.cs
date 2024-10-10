using GomokuServer.Application.Common.Interfaces;
using GomokuServer.Application.Profiles.Interfaces;
using GomokuServer.Core.Entities;
using GomokuServer.Infrastructure.Api;

using Microsoft.Extensions.Logging;

namespace GomokuServer.Infrastructure.Data;

public class ClerkProfilesRepository : IProfilesRepository
{
	private readonly IClerkBackendApi _clerkBackendApiHttpClient;
	private readonly ICacheService _cache;
	private readonly ILogger<ClerkProfilesRepository> _logger;

	public ClerkProfilesRepository(IClerkBackendApi clerkBackendApiHttpClient, ICacheService cache, ILogger<ClerkProfilesRepository> logger)
	{
		_clerkBackendApiHttpClient = clerkBackendApiHttpClient;
		_cache = cache;
		_logger = logger;
	}

	public async Task<Result<Profile>> GetAsync(string id)
	{
		try
		{
			var clerkUser = await _cache.GetOrCreateAsync(id, async entry =>
			{
				return await _clerkBackendApiHttpClient.GetUserByIdAsync(id);
			}, CancellationToken.None);

			return Result.Success(new Profile(id, clerkUser!.Username));
		}
		catch (ApiException apiException) when (apiException.StatusCode == System.Net.HttpStatusCode.NotFound)
		{
			return Result.NotFound($"User with id {id} not found");
		}
		catch (ApiException apiException)
		{
			_logger.LogError(apiException, $"Failed to fetch user profile: {apiException.Message}");
			return Result.Error();
		}
	}
}
