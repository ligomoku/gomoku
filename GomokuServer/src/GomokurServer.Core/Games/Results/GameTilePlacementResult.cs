using GomokuServer.Core.Games.Validation;

namespace GomokuServer.Core.Games.Results;

public record GameTilePlacementResult
{
	public bool IsValid { get; init; }

	public TilePlacementValidationError? ValidationError { get; init; }
}
