namespace GomokuServer.Core.Entities;

public class GameMove
{
	public required Tile Tile { get; init; }

	public required string PlayerId { get; init; }

	public required int MoveNumber { get; init; }
}
