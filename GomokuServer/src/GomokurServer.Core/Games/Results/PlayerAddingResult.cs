using GomokuServer.Core.Games.Validation;

namespace GomokuServer.Core.Games.Results;

public class PlayerAddingResult
{
	public bool IsValid { get; init; }

	public PlayerAddingValidationError? ValidationError { get; init; }
}
