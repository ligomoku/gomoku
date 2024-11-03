using GomokuServer.Core.Common.Results;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Results;

public record RematchResult : CoreResult<RematchValidationError>
{
	public string? GameId { get; init; }

	public static RematchResult Success(string gameId)
	{
		return new RematchResult
		{
			IsValid = true,
			GameId = gameId
		};
	}

	public static RematchResult Failure(RematchValidationError validationError, string errorDetails)
	{
		return new RematchResult
		{
			IsValid = false,
			ValidationError = validationError,
			ErrorDetails = errorDetails
		};
	}
}
