using GomokuServer.Core.Entities;
using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Results;

public class BoardTilePlacementResult
{
	public bool IsValid { get; init; }

	public TileColor? PlacedTileColor { get; init; }

	public TilePlacementValidationError? ValidationError { get; init; }

	public List<Tile>? WinningSequence { get; init; }
}
