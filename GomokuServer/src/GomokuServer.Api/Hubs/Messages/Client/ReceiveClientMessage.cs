namespace GomokuServer.Api.Hubs.Messages.Client;

using MessagePack;

[MessagePackObject]
public record ChatMessageClientMessage
{
	[Key("user")] [Required] public required string User { get; init; }

	[Key("message")] [Required] public required string Message { get; init; }
}
