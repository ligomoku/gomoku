namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public class RematchApprovedMessage
{
	[Required]
	public required string NewGameId { get; init; }
}
