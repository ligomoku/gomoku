using GomokuServer.Application.Games.Dto;

namespace GomokuServer.Application.Games.Responses;

public record PlaceTileResponse(string PlacedTileColor, List<TileDto>? WinningSequence)
{
	public string PlacedTileColor { get; } = PlacedTileColor;

	public bool IsWinningMove => WinningSequence != null;
}
