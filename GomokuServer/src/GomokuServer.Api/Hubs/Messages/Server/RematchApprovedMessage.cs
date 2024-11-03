namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public class RematchApprovedMessage
{
	[Required]
	public required string GameId { get; init; }
}
