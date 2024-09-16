using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Results;

public class PlayerAddingResult
{
	public bool IsValid { get; init; }

	public PlayerAddingValidationError? ValidationError { get; init; }
}
