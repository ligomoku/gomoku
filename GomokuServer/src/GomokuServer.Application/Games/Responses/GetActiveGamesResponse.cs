namespace GomokuServer.Application.Games.Responses;

public record GetActiveGamesResponse
{
	[Required]
	public string GameId { get; init; }

	public ProfileDto? Opponent { get; init; }

	public GetActiveGamesResponse(string gameId)
	{
		GameId = gameId;
	}
}
