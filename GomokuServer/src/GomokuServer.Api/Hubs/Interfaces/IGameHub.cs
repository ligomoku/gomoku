using GomokuServer.Api.MatchingEngine;

using TypedSignalR.Client;

namespace GomokuServer.Api.Hubs.Interfaces;

[Hub]
public interface IGameHub
{
	Task JoinQueueWithMode(GameOptions gameOptions);

	Task LeaveQueue();

	Task JoinGameGroup(string gameId);

	Task MakeMove(MakeMoveClientMessage makeMoveMessage);

	Task Resign(ResignClientMessage message);

	Task RequestUndo(RequestUndoMessage message);

	Task ApproveUndo(ApproveUndoMessage message);

	Task RequestRematch(RematchRequestMessage message);

	Task ApproveRematch(ApproveRematchMessage message);

	Task SendMessage(ChatMessageClientMessage messageRequest);

	Task GetClock(GetClockMessage message);

	Task SendInvitationToPlay(SendInvitationToPlayMessage message);
}

[Receiver]
public interface IGameHubReceiver
{
	Task OnOnlineUserCountChange(long userCount);

	Task OnMatchingPlayerFound(string gameId);

	Task GameGroupJoined(string gameId);

	Task PlayerJoinedGame(PlayerJoinedGameMessage playerJoinedGameMessage);

	Task GameStarted(GameStartedMessage gameStartedMessage);

	Task BothPlayersJoined(BothPlayersJoinedMessage bothPlayersJoinedMessage);

	Task UndoRequested();

	Task UndoApproved(UndoApprovedMessage message);

	Task PlayerMadeMove(PlayerMadeMoveMessage playerMadeMoveMessage);

	Task RematchApproved(RematchApprovedMessage rematchApprovedMessage);

	Task RematchRequested(RematchRequestMessage rematchRequestedMessage);

	Task GameIsOver(GameIsOverMessage gameIsOverMessage);

	Task SendMessage(ChatMessageClientMessage messageRequest);

	Task Clock(ClockDto clock);

	Task GameHubError(ErrorMessage errorMessage);

	Task ReceiveInvitationToPlay(ReceiveInvitationToPlayMessage message);
}
