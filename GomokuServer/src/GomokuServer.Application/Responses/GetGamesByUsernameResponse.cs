namespace GomokuServer.Application.Responses;

public record GetGamesByUsernameResponse(string GameId, string Gen)
{
	[Required]
	public string GameId { get; } = GameId;

	[Required]
	public string Gen { get; } = Gen;
}
