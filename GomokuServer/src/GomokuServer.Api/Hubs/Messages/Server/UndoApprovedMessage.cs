namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public record UndoApprovedMessage
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required TileDto RemovedTile { get; init; }

	[Required]
	public required TileDto PreviouslyPlacedTile { get; init; }
}
