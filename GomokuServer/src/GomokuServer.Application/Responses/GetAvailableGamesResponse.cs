namespace GomokuServer.Application.Responses;

public record GetAvailableGamesResponse(string GameId)
{
	[Required]
	public string GameId { get; } = GameId;
}
