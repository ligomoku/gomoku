namespace GomokuServer.Application.Games.Responses;

public record UndoResponse
{
	public TileDto? RemovedTile { get; init; }

	public TileDto? PreviouslyPlacedTile { get; init; }
}
