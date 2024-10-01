namespace GomokuServer.Application.Responses;

public record PlaceTileResponse(string PlacedTileColor, List<TileDto>? WinningSequence)
{
	public string PlacedTileColor { get; } = PlacedTileColor;

	public bool IsWinningMove => WinningSequence != null;
}
