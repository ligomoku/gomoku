namespace GomokuServer.Core.Games.Entities;

public record GameSettings
{
	public required int BoardSize { get; init; }
}
