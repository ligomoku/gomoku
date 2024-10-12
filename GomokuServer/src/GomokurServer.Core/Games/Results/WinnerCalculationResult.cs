using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Core.Games.Results;

public class WinnerCalculationResult
{
	public required Player Winner { get; set; }

	public required List<Tile> WinningSequence { get; set; }
}
