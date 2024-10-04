namespace GomokuServer.Application.Responses;

public class GetGameCurrentStateResponse
{
	[Required]
	public required string GameId { get; set; }

	public PlayersDto? Players { get; set; }

	[Required]
	public required bool HasBothPlayersJoined { get; set; }

	[Required]
	public required bool IsGameStarted { get; set; }

	public string? NextMoveShouldMakePlayerId { get; set; }

	public PlayerDto? Winner { get; set; }

	public IEnumerable<TileDto>? WinningSequence { get; set; }

	[Required]
	public required int MovesCount { get; set; }

	[Required]
	public required IReadOnlyDictionary<int, TileDto> MovesHistory { get; set; }
}
