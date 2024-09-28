namespace GomokuServer.Application.Responses;

public record GetAvailableGamesResponse(string GameId, PlayerDto Opponent)
{
	[Required]
	public string GameId { get; } = GameId;

	[Required]
	public PlayerDto Opponent { get; } = Opponent;
}
