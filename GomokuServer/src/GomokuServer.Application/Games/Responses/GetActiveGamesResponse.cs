namespace GomokuServer.Application.Games.Responses;

public record GetActiveGamesResponse(string GameId)
{
	[Required]
	public string GameId { get; init; } = GameId;

	public ProfileDto? Opponent { get; init; }

	public TimeControlDto? TimeControl { get; init; }
}
