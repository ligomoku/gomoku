namespace GomokuServer.Application.Responses;

public class GetGameHistoryResponse
{
	[Required]
	public required int BoardSize { get; init; }

	[Required]
	public required int MovesCount { get; init; }

	[Required]
	public required PlayersDto Players { get; init; }

	[Required]
	public required IReadOnlyDictionary<int, TileDto> MovesHistory { get; init; }
}
