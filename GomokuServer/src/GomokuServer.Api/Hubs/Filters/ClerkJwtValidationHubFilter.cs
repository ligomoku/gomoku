using GomokuServer.Api.Services;

namespace GomokuServer.Api.Hubs.Filters;

public class ClerkJwtValidationHubFilter : IHubFilter
{
	private readonly ClerkJwtValidator _clerkJwtValidator;

	public ClerkJwtValidationHubFilter(ClerkJwtValidator clerkJwtValidator)
	{
		_clerkJwtValidator = clerkJwtValidator;
	}

	public async ValueTask<object?> InvokeMethodAsync(HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object?>> next)
	{
		var httpContext = invocationContext.Context.GetHttpContext();
		var token = httpContext?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

		var validationResult = await _clerkJwtValidator.ValidateAsync(token);

		if (validationResult.IsValid)
		{
			invocationContext.Context.Items["User"] = validationResult.Claims;
			return await next(invocationContext);
		}

		invocationContext.Context.Abort();
		return ValueTask.FromResult<object?>(null);
	}
}
