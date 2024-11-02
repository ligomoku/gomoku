namespace GomokuServer.Application.Games.Responses;

/// <summary>
/// Response for game creation, containing the GameId and BoardSize of the newly created game.
/// </summary>
public record CreateGameResponse(string GameId, int BoardSize)
{
	[Required]
	public string GameId { get; } = GameId;

	[Required]
	public int BoardSize { get; } = BoardSize;
};
