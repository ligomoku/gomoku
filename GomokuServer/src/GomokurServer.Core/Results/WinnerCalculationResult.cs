using GomokuServer.Core.Entities;

namespace GomokuServer.Core.Results;

public class WinnerCalculationResult
{
	public required string WinnerId { get; set; }
	
	public required List<Tile> WinningRow { get; set; }
}
