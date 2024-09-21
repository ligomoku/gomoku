namespace GomokuServer.Application.Responses;

public record CreateGameResponse(string GameId)
{
	[Required]
	public string GameId { get; } = GameId;
}
