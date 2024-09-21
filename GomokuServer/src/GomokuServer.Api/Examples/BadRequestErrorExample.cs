using Microsoft.AspNetCore.WebUtilities;

namespace GomokuServer.Api.Examples;

public class BadRequestErrorExample : IExamplesProvider<ProblemDetails>
{
	public ProblemDetails GetExamples()
	{
		return new ProblemDetails
		{
			Status = StatusCodes.Status400BadRequest,
			Title = ReasonPhrases.GetReasonPhrase(StatusCodes.Status400BadRequest),
			Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
		};
	}
}
