namespace GomokuServer.Api.Constants;

public class GameHubMethod
{
	public const string GameGroupJoined = nameof(GameGroupJoined);
	public const string PlayerJoinedGame = nameof(PlayerJoinedGame);
	public const string GameStarted = nameof(GameStarted);
	public const string PlayerMadeMove = nameof(PlayerMadeMove);
	public const string SendMessage = nameof(SendMessage);
	public const string GameHubError = nameof(GameHubError);
	public const string GameIsOver = nameof(GameIsOver);
	public const string RematchRequested = nameof(RematchRequested);
	public const string RematchApproved = nameof(RematchApproved);
}
