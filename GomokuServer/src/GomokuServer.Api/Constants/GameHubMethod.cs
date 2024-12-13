namespace GomokuServer.Api.Constants;

public class GameHubMethod
{
	public const string OnOnlineUserCountChange = nameof(OnOnlineUserCountChange);
	public const string OnMatchingPlayerFound = nameof(OnMatchingPlayerFound);
	public const string GameGroupJoined = nameof(GameGroupJoined);
	public const string PlayerJoinedGame = nameof(PlayerJoinedGame);
	public const string GameStarted = nameof(GameStarted);
	public const string BothPlayersJoined = nameof(BothPlayersJoined);
	public const string PlayerMadeMove = nameof(PlayerMadeMove);
	public const string UndoRequested = nameof(UndoRequested);
	public const string UndoApproved = nameof(UndoApproved);
	public const string SendMessage = nameof(SendMessage);
	public const string GameHubError = nameof(GameHubError);
	public const string GameIsOver = nameof(GameIsOver);
	public const string RematchRequested = nameof(RematchRequested);
	public const string RematchApproved = nameof(RematchApproved);
	public const string Clock = nameof(Clock);
	public const string ReceiveInvitationToPlay = nameof(ReceiveInvitationToPlay);
	public const string Heartbeat = nameof(Heartbeat);
}
