namespace GomokuServer.Api.Core;

public class Move
{
	public int GameId { get; set; }
	public required string Player { get; set; }
	public short Row { get; set; }
	public short Column { get; set; }
}
