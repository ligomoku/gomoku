using GomokuServer.Core.Common.Results;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Results;

public record RematchResult : CoreResult<RematchValidationError>
{
	public Game? NewGame { get; init; }

	public static RematchResult Success(Game newGame)
	{
		return new RematchResult
		{
			IsValid = true,
			NewGame = newGame
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
