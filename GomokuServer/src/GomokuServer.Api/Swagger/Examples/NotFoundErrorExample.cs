using Microsoft.AspNetCore.WebUtilities;

namespace GomokuServer.Api.Swagger.Examples;

public class NotFoundErrorExample : IExamplesProvider<ProblemDetails>
{
	public ProblemDetails GetExamples()
	{
		return new ProblemDetails
		{
			Status = StatusCodes.Status404NotFound,
			Title = ReasonPhrases.GetReasonPhrase(StatusCodes.Status404NotFound),
			Type = "https://tools.ietf.org/html/rfc7231#section-6.5.4",
		};
	}
}
