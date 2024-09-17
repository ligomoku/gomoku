namespace GomokuServer.Api.Controllers.v2.Requests;

public class MakeMoveRequest
{
	public required int X { get; set; }
	public required int Y { get; set; }
}
