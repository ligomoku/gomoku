namespace GomokuServer.Api.Controllers.v2.Requests;

public class CreateGameRequest
{
	public required int BoardSize { get; set; }
}
