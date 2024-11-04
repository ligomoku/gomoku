namespace GomokuServer.Application.Games.Responses;

public class RematchResponse
{
	[Required]
	public required string NewGameId { get; init; }
}
