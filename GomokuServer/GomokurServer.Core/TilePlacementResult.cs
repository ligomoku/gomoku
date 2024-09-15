namespace GomokuServer.Core;

public class TilePlacementResult
{
	public bool IsPlacementValid { get; set; }

	public string? WinnerId { get; set; }
}
