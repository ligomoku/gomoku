using Ardalis.Result;

namespace GomokuServer.Api.Extensions;

using IResult = Ardalis.Result.IResult;

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

		return new NoContentResult();
	}

	public static ErrorMessage GetHubError(this IResult result)
	{
		if (result.IsNotFound())
		{
			return new ErrorMessage(string.Join(", ", result.Errors));
		}

		if (result.IsInvalid())
		{
			return new ErrorMessage(string.Join(", ", result.ValidationErrors.Select(error => error.ErrorMessage)));
		}

		return new ErrorMessage("Unexpected error occured");
	}
}
