using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Core.Games.Results;

public record UndoResult : GameActionResult
{
	public Tile? RemovedTile { get; init; }

	public Tile? PreviouslyPlacedTile { get; init; }
}
