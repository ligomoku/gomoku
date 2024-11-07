using TypedSignalR.Client;

namespace GomokuServer.Api.Hubs.Interfaces;

[Hub]
public interface IGameHub
{
	Task JoinGameGroup(string gameId);

	Task MakeMove(MakeMoveClientMessage makeMoveMessage);

	Task Resign(ResignClientMessage message);

	Task RequestRematch(RematchRequestMessage message);

	Task ApproveRematch(ApproveRematchMessage message);

	Task SendMessage(ChatMessageClientMessage messageRequest);

	Task GetClock(GetClockMessage message);
}

[Receiver]
public interface IGameHubReceiver
{
	Task GameGroupJoined(string gameId);

	Task PlayerJoinedGame(PlayerJoinedGameMessage playerJoinedGameMessage);

	Task GameStarted(GameStartedMessage gameStartedMessage);

	Task BothPlayersJoined(BothPlayersJoinedMessage bothPlayersJoinedMessage);

	Task PlayerMadeMove(PlayerMadeMoveMessage playerMadeMoveMessage);

	Task RematchApproved(RematchApprovedMessage rematchApprovedMessage);

	Task RematchRequested(RematchRequestMessage rematchRequestedMessage);

	Task GameIsOver(GameIsOverMessage gameIsOverMessage);

	Task SendMessage(ChatMessageClientMessage messageRequest);

	Task Clock(ClockDto clock);

	Task GameHubError(ErrorMessage errorMessage);
}
