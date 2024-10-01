namespace GomokuServer.Application.Responses;

public class GetGameResponse
{
	[Required]
	public required string GameId { get; set; }

	public PlayerDto? PlayerOne { get; set; }

	public PlayerDto? PlayerTwo { get; set; }

	[Required]
	public required bool HasBothPlayersJoined { get; set; }

	[Required]
	public required bool IsGameStarted { get; set; }

	public string? NextMoveShouldMakePlayerId { get; set; }

	public PlayerDto? Winner { get; set; }

	public IEnumerable<TileDto>? WinningSequence { get; set; }

	[Required]
	public required IReadOnlyDictionary<string, GameMoveDto> PlayersMoves { get; set; }
}
