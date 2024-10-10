namespace GomokuServer.Application.Games.Responses;

public record GetGamesByUsernameResponse
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required UsernamesDto Players { get; init; }

	public string? Winner { get; init; }

	[Required]
	public required string Gen { get; init; }

	[Required]
	public required DateTime Date { get; init; }
}
