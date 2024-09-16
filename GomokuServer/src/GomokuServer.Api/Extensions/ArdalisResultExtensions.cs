using Ardalis.Result;

namespace GomokuServer.Api.Extensions;

public static class ArdalisResultExtensions
{
	public static IActionResult ToApiResponse<T>(this Result<T> result)
	{
		if (result.IsNotFound())
		{
			return new NotFoundObjectResult(result.Errors);
		}

		if (result.IsInvalid())
		{
			return new BadRequestObjectResult(result.ValidationErrors);
		}

		if (result.IsError())
		{
			return new StatusCodeResult(503);
		}

		return new OkObjectResult(result.Value);
	}

	public static IActionResult ToApiResponse(this Result result)
	{
		if (result.IsNotFound())
		{
			return new NotFoundObjectResult(result.Errors);
		}

		if (result.IsInvalid())
		{
			return new BadRequestObjectResult(result.ValidationErrors);
		}

		if (result.IsError())
		{
			return new StatusCodeResult(503);
		}

		return new OkResult();
	}
}
