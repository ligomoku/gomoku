﻿namespace GomokuServer.Application.Games.Responses;

public class GetGameHistoryResponse
{
	[Required]
	public required int BoardSize { get; init; }

	[Required]
	public required string Gen { get; init; }

	[Required]
	public required int MovesCount { get; init; }

	[Required]
	public required UsernamesDto Players { get; init; }

	[Required]
	public required bool IsCompleted { get; set; }

	public string? Winner { get; init; }

	[Required]
	public required IReadOnlyDictionary<int, TileDto> MovesHistory { get; init; }

	public TimeControlDto? TimeControl { get; init; }

	public ClockDto? Clock { get; init; }
}
