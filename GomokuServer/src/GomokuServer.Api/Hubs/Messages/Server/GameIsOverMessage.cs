namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public class GameIsOverMessage
{
	[Required]
	public required string Result { get; init; }

	public List<TileDto>? WinningSequence { get; init; }
}
