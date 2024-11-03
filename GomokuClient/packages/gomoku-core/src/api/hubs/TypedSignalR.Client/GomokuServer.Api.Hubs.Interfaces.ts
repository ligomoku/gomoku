/* THIS (.ts) FILE IS GENERATED BY TypedSignalR.Client.TypeScript */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import type { IStreamResult, Subject } from "@microsoft/signalr";
import type {
  MakeMoveClientMessage,
  ResignClientMessage,
  RematchRequestMessage,
  RematchApprovalMessage,
  ChatMessageClientMessage,
} from "../GomokuServer.Api.Hubs.Messages.Client";
import type {
  PlayerJoinedGameMessage,
  GameStartedMessage,
  PlayerMadeMoveMessage,
  GameIsOverMessage,
  ErrorMessage,
} from "../GomokuServer.Api.Hubs.Messages.Server";

export type IGameHub = {
  /**
   * @param gameId Transpiled from string
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  joinGameGroup(gameId: string): Promise<void>;
  /**
   * @param makeMoveMessage Transpiled from GomokuServer.Api.Hubs.Messages.Client.MakeMoveClientMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  makeMove(makeMoveMessage: MakeMoveClientMessage): Promise<void>;
  /**
   * @param message Transpiled from GomokuServer.Api.Hubs.Messages.Client.ResignClientMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  resign(message: ResignClientMessage): Promise<void>;
  /**
   * @param message Transpiled from GomokuServer.Api.Hubs.Messages.Client.RematchRequestMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  requestRematch(message: RematchRequestMessage): Promise<void>;
  /**
   * @param message Transpiled from GomokuServer.Api.Hubs.Messages.Client.RematchApprovalMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  approveRematch(message: RematchApprovalMessage): Promise<void>;
  /**
   * @param messageRequest Transpiled from GomokuServer.Api.Hubs.Messages.Client.ChatMessageClientMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  sendMessage(messageRequest: ChatMessageClientMessage): Promise<void>;
};

export type IGameHubReceiver = {
  /**
   * @param gameId Transpiled from string
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  gameGroupJoined(gameId: string): Promise<void>;
  /**
   * @param playerJoinedGameMessage Transpiled from GomokuServer.Api.Hubs.Messages.Server.PlayerJoinedGameMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  playerJoinedGame(
    playerJoinedGameMessage: PlayerJoinedGameMessage,
  ): Promise<void>;
  /**
   * @param gameStartedMessage Transpiled from GomokuServer.Api.Hubs.Messages.Server.GameStartedMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  gameStarted(gameStartedMessage: GameStartedMessage): Promise<void>;
  /**
   * @param playerMadeMoveMessage Transpiled from GomokuServer.Api.Hubs.Messages.Server.PlayerMadeMoveMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  playerMadeMove(playerMadeMoveMessage: PlayerMadeMoveMessage): Promise<void>;
  /**
   * @param rematchApprovedMessage Transpiled from GomokuServer.Api.Hubs.Messages.Client.RematchApprovalMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  rematchApproved(
    rematchApprovedMessage: RematchApprovalMessage,
  ): Promise<void>;
  /**
   * @param rematchRequestedMessage Transpiled from GomokuServer.Api.Hubs.Messages.Client.RematchRequestMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  rematchRequested(
    rematchRequestedMessage: RematchRequestMessage,
  ): Promise<void>;
  /**
   * @param gameIsOverMessage Transpiled from GomokuServer.Api.Hubs.Messages.Server.GameIsOverMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  gameIsOver(gameIsOverMessage: GameIsOverMessage): Promise<void>;
  /**
   * @param messageRequest Transpiled from GomokuServer.Api.Hubs.Messages.Client.ChatMessageClientMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  sendMessage(messageRequest: ChatMessageClientMessage): Promise<void>;
  /**
   * @param errorMessage Transpiled from GomokuServer.Api.Hubs.Messages.Server.ErrorMessage
   * @returns Transpiled from System.Threading.Tasks.Task
   */
  gameHubError(errorMessage: ErrorMessage): Promise<void>;
};
