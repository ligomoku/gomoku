using Tapper;

namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public record PlayerResignedMessage
{
	[Required]
	public required string PlayerId { get; init; }
}
