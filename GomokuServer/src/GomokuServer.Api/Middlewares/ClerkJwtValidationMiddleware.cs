using GomokuServer.Api.Attributes;
using GomokuServer.Api.Services;

namespace GomokuServer.Api.Middlewares;

public class ClerkJwtValidationMiddleware
{
	private readonly RequestDelegate _next;
	private readonly ClerkJwtValidator _clerkJwtValidator;

	public ClerkJwtValidationMiddleware(RequestDelegate next, ClerkJwtValidator clerkJwtValidator)
	{
		_next = next;
		_clerkJwtValidator = clerkJwtValidator;
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

		var validationResult = await _clerkJwtValidator.ValidateAsync(token);

		if (validationResult.IsValid)
		{
			context.User = validationResult.Claims!;
			await _next(context);
			return;
		}

		context.Response.StatusCode = validationResult.HttpStatusCode;
		await context.Response.WriteAsJsonAsync(new ProblemDetails
		{
			Status = validationResult.HttpStatusCode,
			Detail = validationResult.ErrorMessage
		});
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
