namespace GomokuServer.Api.Hubs.Messages.Server;

public record PlayerJoinedGameMessage
{
	public required string UserName { get; init; }
}
