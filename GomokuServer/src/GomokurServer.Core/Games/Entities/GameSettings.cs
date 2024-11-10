namespace GomokuServer.Core.Games.Entities;

public record GameSettings
{
	public required Guid GameId { get; init; }

	public required int BoardSize { get; init; }
}
