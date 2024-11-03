namespace GomokuServer.Application.Games.Responses;

public class RematchResponse
{
	[Required]
	public required string GameId { get; init; }
}
