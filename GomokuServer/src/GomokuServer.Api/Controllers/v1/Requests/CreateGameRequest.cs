namespace GomokuServer.Api.Controllers.v1.Requests;

public class CreateGameRequest
{
	[Required]
	public required int BoardSize { get; set; }

	public TimeControlDto? TimeControl { get; set; }
}
