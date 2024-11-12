namespace GomokuServer.Api.Controllers.v1.Requests;

public class GetAvailableGamesRequest : PaginationRequest
{
	[Required]
	[Obsolete]
	public required bool IsAnonymous { get; init; }
}
