namespace GomokuServer.Core;

public class PlayerAddingResult
{
	public bool IsValid { get; init; }

	public PlayerAddingValidationError? ValidationError { get; init; }
}
