using Tapper;

namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public record PlayerJoinedGameMessage
{
	public required string UserName { get; init; }
}
