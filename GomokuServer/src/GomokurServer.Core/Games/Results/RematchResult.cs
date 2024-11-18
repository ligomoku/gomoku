using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Results;

public record RematchResult : GameActionResult
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

	public static RematchResult Failure(GameActionValidationError validationError, string errorDetails)
	{
		return new RematchResult
		{
			IsValid = false,
			ValidationError = validationError,
			ErrorDetails = errorDetails
		};
	}
}
