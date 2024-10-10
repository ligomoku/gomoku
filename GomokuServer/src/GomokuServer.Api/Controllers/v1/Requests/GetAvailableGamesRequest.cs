namespace GomokuServer.Api.Controllers.v1.Requests;

public class GetAvailableGamesRequest : PaginationRequest
{
	[Required]
	public required bool IsAnonymus { get; init; }
}
