using Microsoft.AspNetCore.Authorization;

namespace GomokuServer.Api.Hubs.Middlewares;

public class JwtClaimsValidationMiddleware
{
	private readonly RequestDelegate _next;

	public JwtClaimsValidationMiddleware(RequestDelegate next)
	{
		_next = next;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		var endpoint = context.GetEndpoint();
		var hasAuthorization = endpoint?.Metadata
			.GetMetadata<AuthorizeAttribute>() != null;

		if (hasAuthorization)
		{
			var userIdClaim = context.User.Claims.Get(JwtClaims.UserId);
			var usernameClaim = context.User.Claims.Get(JwtClaims.UserName);

			if (string.IsNullOrWhiteSpace(userIdClaim) || string.IsNullOrWhiteSpace(usernameClaim))
			{
				context.Response.StatusCode = StatusCodes.Status400BadRequest;
				await context.Response.WriteAsJsonAsync(new { ErrorMessage = $"Missing '{JwtClaims.UserId}' or '{JwtClaims.UserName}' claim" });
				return;
			}
		}

		await _next(context);
	}
}

public static class ClerkJwtClaimsValidationMiddlewareExtensions
{
	public static IApplicationBuilder UseJwtClaimsValidation(
		this IApplicationBuilder builder)
	{
		return builder.UseMiddleware<JwtClaimsValidationMiddleware>();
	}
}
