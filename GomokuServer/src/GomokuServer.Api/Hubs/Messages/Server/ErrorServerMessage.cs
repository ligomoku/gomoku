namespace GomokuServer.Api.Hubs.Messages.Server;

public record ErrorServerMessage
{
	public required string Message { get; init; }
}
