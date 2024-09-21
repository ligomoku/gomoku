namespace GomokuServer.Application.Responses;

public record PlaceTileResponse(List<TileDto>? WinningSequence)
{
	public bool IsWinningMove => WinningSequence != null;
}
