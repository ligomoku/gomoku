namespace GomokuServer.Api.Controllers.v1.Requests;

public class CreatePlayerRequest
{
	[Required]
	public required string Id { get; set; }
}
