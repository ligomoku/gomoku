using Tapper;

namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public class ResignClientMessage
{
	[Required]
	public required string GameId { get; init; }
}
