using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Results;

public class TilePlacementResult
{
	public bool IsValid { get; init; }

	public TilePlacementValidationError? ValidationError { get; init; }

	public string? WinnerId { get; init; }
}
