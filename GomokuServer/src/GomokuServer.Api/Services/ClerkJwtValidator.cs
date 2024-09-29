using System.Security.Claims;

using Microsoft.Extensions.Caching.Memory;

using Refit;

namespace GomokuServer.Api.Services;

public class ClerkJwtValidator
{
	private readonly IClerkFrontendApi _clerkFrontendApi;
	private readonly IMemoryCache _memoryCache;
	private readonly ILogger<ClerkJwtValidationMiddleware> _logger;
	private const string JWKS_CACHE_KEY = "ClerkJWKS";

	public ClerkJwtValidator(IClerkFrontendApi clerkFrontendApi, IMemoryCache memoryCache, ILogger<ClerkJwtValidationMiddleware> logger)
	{
		_clerkFrontendApi = clerkFrontendApi;
		_memoryCache = memoryCache;
		_logger = logger;
	}

	public async Task<ClerkJwtValidationResult> ValidateAsync(string? token)
	{
		ClaimsPrincipal? claimsPrincipal = null;
		try
		{
			if (string.IsNullOrWhiteSpace(token))
			{
				return new()
				{
					IsValid = false,
					ErrorMessage = "Token is missing",
					HttpStatusCode = StatusCodes.Status401Unauthorized
				};
			}

			var jwksJson = await _memoryCache.GetOrCreateAsync(JWKS_CACHE_KEY, async entry =>
			{
				entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
				return await _clerkFrontendApi.GetJwks();
			});
			var jsonWebKeySet = new JsonWebKeySet(jwksJson);

			var tokenHandler = new JwtSecurityTokenHandler();
			var validationParameters = new TokenValidationParameters
			{
				ValidateIssuer = false,
				ValidateAudience = false,
				ValidateIssuerSigningKey = true,
				ValidateLifetime = true,
				IssuerSigningKeys = jsonWebKeySet.GetSigningKeys()
			};

			try
			{
				claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out _);
			}
			catch (SecurityTokenException)
			{
				return new()
				{
					IsValid = false,
					ErrorMessage = "Token validation failed",
					HttpStatusCode = StatusCodes.Status401Unauthorized
				};
			}
		}
		catch (ApiException)
		{
			_logger.LogError("Unable to fetch jwks file from clerk. Check url in configuration");

			return new()
			{
				IsValid = false,
				ErrorMessage = "Unable to fetch public key",
				HttpStatusCode = StatusCodes.Status503ServiceUnavailable
			};
		}
		catch (SecurityTokenMalformedException exception)
		{
			_logger.LogError(exception, exception.Message);

			return new()
			{
				IsValid = false,
				ErrorMessage = "Incorrect JWT token",
				HttpStatusCode = StatusCodes.Status503ServiceUnavailable
			};
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, exception.Message);

			return new()
			{
				IsValid = false,
				ErrorMessage = "Unexpected error occured",
				HttpStatusCode = StatusCodes.Status503ServiceUnavailable
			};
		}

		return new()
		{
			IsValid = true,
			ClaimsPrincipal = claimsPrincipal,
			HttpStatusCode = StatusCodes.Status200OK,
		};
	}
}

public record ClerkJwtValidationResult
{
	public required bool IsValid { get; init; }

	public ClaimsPrincipal? ClaimsPrincipal { get; init; }

	public string? ErrorMessage { get; set; }

	public required int HttpStatusCode { get; set; }
}
