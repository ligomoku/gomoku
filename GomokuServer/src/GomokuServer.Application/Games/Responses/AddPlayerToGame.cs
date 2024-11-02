namespace GomokuServer.Application.Games.Responses;

public record AddPlayerToGameResponse(string GameId, string PlayerId)
{
	[Required]
	public string GameId { get; } = GameId;

	[Required]
	public string PlayerId { get; } = PlayerId;
};

