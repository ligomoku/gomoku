namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public class GameIsOverMessage
{
	[Required]
	public required string Result { get; set; }
}
