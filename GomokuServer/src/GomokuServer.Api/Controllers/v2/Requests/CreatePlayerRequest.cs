namespace GomokuServer.Api.Controllers.v2.Requests;

public class CreatePlayerRequest
{
	[Required]
	public required string Id { get; set; }
}
