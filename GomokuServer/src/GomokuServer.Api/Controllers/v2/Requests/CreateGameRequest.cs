namespace GomokuServer.Api.Controllers.v2.Requests;

public class CreateGameRequest
{
	[Required]
	public required int BoardSize { get; set; }
}
