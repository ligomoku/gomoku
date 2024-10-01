namespace GomokuServer.Api.Hubs.Messages.Server;

public record ErrorMessage(string Message)
{
	public string Message { get; } = Message;
}
