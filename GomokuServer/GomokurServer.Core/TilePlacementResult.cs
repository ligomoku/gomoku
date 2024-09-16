namespace GomokuServer.Core;

public class TilePlacementResult
{
	public bool IsPlacementValid { get; init; }

	public TilePlacementValidationError? ValidationError { get; init; }

	public string? WinnerId { get; init; }
}
