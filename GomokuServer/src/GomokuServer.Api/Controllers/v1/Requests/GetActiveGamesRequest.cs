namespace GomokuServer.Api.Controllers.v1.Requests;

public class GetActiveGamesRequest : PaginationRequest
{
	public bool IsAnonymous { get; set; }
}
