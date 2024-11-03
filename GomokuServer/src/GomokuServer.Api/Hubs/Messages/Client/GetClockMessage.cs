namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public class GetClockMessage
{
	[Required]
	public required string GameId { get; init; }
}
