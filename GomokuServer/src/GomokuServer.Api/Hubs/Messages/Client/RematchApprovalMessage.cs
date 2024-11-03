namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public class RematchApprovalMessage
{
	[Required]
	public required string GameId { get; init; }
}
