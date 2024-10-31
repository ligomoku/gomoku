namespace GomokuServer.Api.Controllers.v1.Requests;

public class PaginationRequest
{
	[FromQuery]
	public int? Limit { get; set; } = 5;

	[FromQuery]
	public int? Offset { get; set; } = 0;
}
