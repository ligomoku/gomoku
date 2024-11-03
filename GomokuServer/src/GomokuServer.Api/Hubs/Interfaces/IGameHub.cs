﻿using TypedSignalR.Client;

namespace GomokuServer.Api.Hubs.Interfaces;

[Hub]
public interface IGameHub
{
	Task JoinGameGroup(string gameId);

	Task MakeMove(MakeMoveClientMessage makeMoveMessage);

	Task Resign(ResignClientMessage message);

	Task RequestRematch(RematchRequestMessage message);

	Task ApproveRematch(RematchApprovalMessage message);

	Task SendMessage(ChatMessageClientMessage messageRequest);
}

[Receiver]
public interface IGameHubReceiver
{
	Task GameGroupJoined(string gameId);

	Task PlayerJoinedGame(PlayerJoinedGameMessage playerJoinedGameMessage);

	Task GameStarted(GameStartedMessage gameStartedMessage);

	Task PlayerMadeMove(PlayerMadeMoveMessage playerMadeMoveMessage);

	Task RematchApproved(RematchApprovalMessage rematchApprovedMessage);

	Task RematchRequested(RematchRequestMessage rematchRequestedMessage);

	Task GameIsOver(GameIsOverMessage gameIsOverMessage);

	Task SendMessage(ChatMessageClientMessage messageRequest);

	Task GameHubError(ErrorMessage errorMessage);
}
