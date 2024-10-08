namespace GomokuServer.Application.Responses;

/// <summary>
/// Response for game creation, containing the GameId and BoardSize of the newly created game.
/// </summary>
public record CreateGameResponse(
	[Required] string GameId,
	int BoardSize
);
