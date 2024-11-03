namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public class ApproveRematchMessage
{
	public required string GameId { get; init; }
}
