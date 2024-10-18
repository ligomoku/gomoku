namespace GomokuServer.Application.Games.Responses;

public record GetGamesByUsernameResponse
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required UsernamesDto Players { get; init; }

	[Required]
	public bool IsCompleted { get; init; }

	public string? Winner { get; init; }

	[Required]
	public required string Gen { get; init; }

	[Required]
	public required DateTime Date { get; init; }

	public TimeControlDto? TimeControl { get; init; }

	public ClockDto? Clock { get; init; }
}
