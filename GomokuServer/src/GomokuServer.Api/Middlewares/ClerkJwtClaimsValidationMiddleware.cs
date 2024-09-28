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
			var userIdClaim = context.User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

			if (string.IsNullOrEmpty(userIdClaim))
			{
				context.Response.StatusCode = StatusCodes.Status400BadRequest;
				await context.Response.WriteAsJsonAsync(new { ErrorMessage = "Missing 'userId' claim" });
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
