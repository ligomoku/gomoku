namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public class RequestUndoMessage
{
	[Required]
	public required string GameId { get; init; }
}
