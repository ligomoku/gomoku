namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public class RematchRequestMessage
{
	[Required]
	public required string GameId { get; init; }
}
