namespace GomokuServer.Application.Responses;

public record GetAvailableGamesResponse(string GameId, OpponentDto Opponent)
{
	[Required]
	public string GameId { get; } = GameId;

	[Required]
	public OpponentDto Opponent { get; } = Opponent;
}
