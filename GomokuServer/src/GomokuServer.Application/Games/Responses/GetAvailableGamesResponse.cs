namespace GomokuServer.Application.Games.Responses;

public record GetAvailableGamesResponse(string GameId)
{
	[Required]
	public string GameId { get; } = GameId;

	public ProfileDto? Opponent { get; init; }

	public TimeControlDto? TimeControl { get; init; }
}
