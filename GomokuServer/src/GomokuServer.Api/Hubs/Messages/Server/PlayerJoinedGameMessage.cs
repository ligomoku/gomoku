namespace GomokuServer.Api.Hubs.Messages.Server;

/// <summary>
/// Message broadcasted when a player joins a game.
/// </summary>
[TranspilationSource]
public record PlayerJoinedGameMessage
{
	public required string UserId { get; init; }
}
