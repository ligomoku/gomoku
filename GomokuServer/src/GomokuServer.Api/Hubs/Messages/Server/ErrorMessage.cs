using Tapper;

namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public record ErrorMessage(string Message)
{
	public string Message { get; } = Message;
}
