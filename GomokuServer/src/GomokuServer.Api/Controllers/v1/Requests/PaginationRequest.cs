using System.Text.Json.Serialization;

namespace GomokuServer.Api.Controllers.v1.Requests;

public class PaginationRequest
{
	[FromQuery]
	[JsonPropertyName("limit")]
	public required int Limit { get; set; } = 5;

	[FromQuery]
	[JsonPropertyName("offset")]
	public required int Offset { get; set; } = 0;
}
