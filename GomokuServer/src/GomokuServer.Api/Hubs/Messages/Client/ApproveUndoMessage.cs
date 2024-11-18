namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public class ApproveUndoMessage
{
	[Required]
	public required string GameId { get; init; }
}
