using GomokuServer.Core.Entities;

namespace GomokuServer.Core.Results;

public class WinnerCalculationResult
{
	public required Player Winner { get; set; }

	public required List<Tile> WinningSequence { get; set; }
}
