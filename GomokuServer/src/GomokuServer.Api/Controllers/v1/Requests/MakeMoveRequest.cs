namespace GomokuServer.Api.Controllers.v1.Requests;

public class MakeMoveRequest
{
	[Required]
	public required int X { get; set; }

	[Required]
	public required int Y { get; set; }
}
