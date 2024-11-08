namespace GomokuServer.Application.Games.Responses;

public class GetGameHistoryResponse
{
	[Required]
	public required int BoardSize { get; init; }

	[Required]
	public required string Gen { get; init; }

	[Required]
	public required int MovesCount { get; init; }

	[Required]
	public required PlayersDto Players { get; init; }

	[Required]
	public required bool IsGameStarted { get; set; }

	[Required]
	public required bool HasBothPlayersJoined { get; set; }

	[Required]
	public required bool IsCompleted { get; set; }

	public string? Winner { get; init; }

	public List<TileDto>? WinningSequence { get; init; }

	[Required]
	public required IReadOnlyDictionary<int, TileDto> MovesHistory { get; init; }

	public TimeControlDto? TimeControl { get; init; }

	public ClockDto? Clock { get; init; }
}
