namespace GomokuServer.Application.Responses;

public record GetAvailableGamesResponse(string GameId, ProfileDto Opponent)
{
	[Required]
	public string GameId { get; } = GameId;

	[Required]
	public ProfileDto Opponent { get; } = Opponent;
}
