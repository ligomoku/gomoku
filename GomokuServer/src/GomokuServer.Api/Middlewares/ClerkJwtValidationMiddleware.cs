using GomokuServer.Api.Attributes;

using Microsoft.Extensions.Caching.Memory;

using Refit;

using ProblemDetails = Microsoft.AspNetCore.Mvc.ProblemDetails;

namespace GomokuServer.Api.Middlewares;

public class ClerkJwtValidationMiddleware
{
	private readonly RequestDelegate _next;
	private readonly IClerkFrontendApi _clerkClientApi;
	private readonly IMemoryCache _memoryCache;
	private readonly ILogger<ClerkJwtValidationMiddleware> _logger;
	private const string JWKS_CACHE_KEY = "ClerkJWKS";

	public ClerkJwtValidationMiddleware(RequestDelegate next, IClerkFrontendApi clerkClientApi, IMemoryCache memoryCache, ILogger<ClerkJwtValidationMiddleware> logger)
	{
		_next = next;
		_clerkClientApi = clerkClientApi;
		_memoryCache = memoryCache;
		_logger = logger;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		try
		{
			var endpoint = context.GetEndpoint();
			var enpointMetadata = endpoint?.Metadata;

			var clerkAuthorizationAttribute = enpointMetadata?.FirstOrDefault(x => x.GetType() == typeof(ClerkAuthorizationAttribute));

			if (clerkAuthorizationAttribute == null)
			{
				await _next(context);
				return;
			}

			var token = context.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

			if (string.IsNullOrWhiteSpace(token))
			{
				context.Response.StatusCode = StatusCodes.Status401Unauthorized;
				await context.Response.WriteAsJsonAsync(GetUnauthorizedResponse("Token is missing"));
				return;
			}

			var jwksJson = await _memoryCache.GetOrCreateAsync(JWKS_CACHE_KEY, async entry =>
			{
				entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
				return await _clerkClientApi.GetJwks();
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
				var principal = tokenHandler.ValidateToken(token, validationParameters, out _);
				context.User = principal;
				await _next(context);
			}
			catch (SecurityTokenException)
			{
				context.Response.StatusCode = StatusCodes.Status401Unauthorized;
				await context.Response.WriteAsJsonAsync(GetUnauthorizedResponse("Token validation failed"));
			}
		}
		catch (ApiException)
		{
			_logger.LogError("Unable to fetch jwks file from clerk. Check url in configuration");
			context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
		}
		catch (SecurityTokenMalformedException exception)
		{
			_logger.LogError(exception, exception.Message);
			context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
			await context.Response.WriteAsJsonAsync(new { ErrorMessage = "Incorrect JWT token" });
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, exception.Message);
			context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
		}
	}

	private static ProblemDetails GetUnauthorizedResponse(string message)
	{
		return new ProblemDetails
		{
			Status = StatusCodes.Status401Unauthorized,
			Title = "Unauthorized",
			Detail = message
		};
	}
}

public static class ClerkJwtValidationMiddlewareExtensions
{
	public static IApplicationBuilder UseClerkJwtValidation(
		this IApplicationBuilder builder)
	{
		return builder.UseMiddleware<ClerkJwtValidationMiddleware>();
	}
}
