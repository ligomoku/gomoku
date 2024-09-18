using GomokuServer.Core.Entities;

namespace GomokuServer.Application.Responses;

public record PlaceTileResponse(List<Tile>? WinningSequence)
{
	public bool IsWinningMove => WinningSequence != null;
}
