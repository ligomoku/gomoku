using GomokuServer.Core.Entities;
using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Results;

public class TilePlacementResult
{
	public bool IsValid { get; init; }

	public TilePlacementValidationError? ValidationError { get; init; }

	public string? WinnerId { get; init; }

	public List<Tile>? WinningRow { get; init; }
}
