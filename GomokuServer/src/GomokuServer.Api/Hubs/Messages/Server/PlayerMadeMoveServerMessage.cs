namespace GomokuServer.Api.Hubs.Messages.Server;

public record PlayerMadeMoveServerMessage
{
	public required string PlayerId { get; init; }

	public required TileDto Tile { get; init; }
}
