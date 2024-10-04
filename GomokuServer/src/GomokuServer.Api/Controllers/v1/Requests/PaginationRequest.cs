namespace GomokuServer.Api.Controllers.v1.Requests;

public class PaginationRequest
{
	[FromQuery]
	public required int Limit { get; set; } = 5;

	[FromQuery]
	public required int Offset { get; set; } = 0;
}
