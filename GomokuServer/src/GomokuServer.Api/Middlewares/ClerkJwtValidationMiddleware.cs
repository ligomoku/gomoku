using GomokuServer.Api.Attributes;

namespace GomokuServer.Api.Middlewares;

public class ClerkJwtValidationMiddleware
{
	private readonly RequestDelegate _next;

	public ClerkJwtValidationMiddleware(RequestDelegate next)
	{
		_next = next;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		var endpoint = context.GetEndpoint();
		var enpointMetadata = endpoint?.Metadata;

		var clerkAuthorizationAttribute = enpointMetadata?.FirstOrDefault(x => x.GetType() == typeof(ClerkAuthorizationAttribute));

		if (clerkAuthorizationAttribute == null)
		{
			await _next(context);
		}

		var token = context.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

		if (string.IsNullOrEmpty(token))
		{
			context.Response.StatusCode = StatusCodes.Status401Unauthorized;
			await context.Response.WriteAsync("Token is missing.");
			return;
		}

		using var httpClient = new HttpClient();
		var clerkUrl = "https://allowed-muskrat-40.clerk.accounts.dev";
		var jwksJson = await httpClient.GetStringAsync($"{clerkUrl}/.well-known/jwks.json");
		var jsonWebKeySet = new JsonWebKeySet(jwksJson);

		var tokenHandler = new JwtSecurityTokenHandler();
		var validationParameters = new TokenValidationParameters
		{
			ValidateIssuer = false,
			ValidateAudience = false,
			ValidateIssuerSigningKey = true,
			ValidateLifetime = true,
			ValidIssuer = "https://allowed-muskrat-40.clerk.dev",
			IssuerSigningKeys = jsonWebKeySet.GetSigningKeys()
		};

		try
		{
			tokenHandler.ValidateToken(token, validationParameters, out _);
			await _next(context);
		}
		catch (SecurityTokenException exception)
		{
			context.Response.StatusCode = StatusCodes.Status401Unauthorized;
			await context.Response.WriteAsync("Token validation failed.");
		}
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
