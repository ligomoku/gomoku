﻿using GomokuServer.Api.Attributes;

using Microsoft.Extensions.Caching.Memory;

namespace GomokuServer.Api.Middlewares;

public class ClerkJwtValidationMiddleware
{
	private readonly RequestDelegate _next;
	private readonly IClerkFrontendApi _clerkClientApi;
	private readonly IMemoryCache _memoryCache;
	private const string JWKS_CACHE_KEY = "ClerkJWKS";

	public ClerkJwtValidationMiddleware(RequestDelegate next, IClerkFrontendApi clerkClientApi, IMemoryCache memoryCache)
	{
		_next = next;
		_clerkClientApi = clerkClientApi;
		_memoryCache = memoryCache;
	}

	public async Task InvokeAsync(HttpContext context)
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
			await _next(context);
		}
		catch (SecurityTokenException)
		{
			context.Response.StatusCode = StatusCodes.Status401Unauthorized;
			await context.Response.WriteAsJsonAsync(GetUnauthorizedResponse("Token validation failed"));
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