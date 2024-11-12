namespace GomokuServer.Api.Controllers.v1.Requests;

public class GetActiveGamesRequest : PaginationRequest
{
	[Obsolete]
	public bool IsAnonymous { get; set; }
}
