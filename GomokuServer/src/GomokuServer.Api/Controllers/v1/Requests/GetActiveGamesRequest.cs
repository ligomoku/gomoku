namespace GomokuServer.Api.Controllers.v1.Requests;

public class GetActiveGamesRequest
{
	public bool IsAnonymous { get; set; }
	public int Limit { get; set; } = 5;
	public int Offset { get; set; } = 0;
}
