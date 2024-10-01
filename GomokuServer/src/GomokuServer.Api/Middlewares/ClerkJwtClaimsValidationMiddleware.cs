using GomokuServer.Api.Attributes;

namespace GomokuServer.Api.Middlewares;

public class ClerkJwtClaimsValidationMiddleware
{
	private readonly RequestDelegate _next;

	public ClerkJwtClaimsValidationMiddleware(RequestDelegate next)
	{
		_next = next;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		var endpoint = context.GetEndpoint();
		var hasClerkAuthorization = endpoint?.Metadata
			.GetMetadata<ClerkAuthorizationAttribute>() != null;

		if (hasClerkAuthorization)
		{
			var userIdClaim = context.User.Claims.Get("userId");
			var usernameClaim = context.User.Claims.Get("username");

			if (string.IsNullOrWhiteSpace(userIdClaim) || string.IsNullOrWhiteSpace(usernameClaim))
			{
				context.Response.StatusCode = StatusCodes.Status400BadRequest;
				await context.Response.WriteAsJsonAsync(new { ErrorMessage = "Missing 'userId' or 'username' claim" });
				return;
			}
		}

		await _next(context);
	}
}

public static class ClerkJwtClaimsValidationMiddlewareExtensions
{
	public static IApplicationBuilder UseClerkJwtClaimsValidation(
		this IApplicationBuilder builder)
	{
		return builder.UseMiddleware<ClerkJwtClaimsValidationMiddleware>();
	}
}
