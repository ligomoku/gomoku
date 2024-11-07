namespace GomokuServer.Application.Games.Responses;

public record PlaceTileResponse(string PlacedTileColor, List<TileDto>? WinningSequence)
{
	public string PlacedTileColor { get; } = PlacedTileColor;

	public bool IsWinningMove => WinningSequence != null;

	public long? RemainingTimeInSeconds { get; init; }
}
