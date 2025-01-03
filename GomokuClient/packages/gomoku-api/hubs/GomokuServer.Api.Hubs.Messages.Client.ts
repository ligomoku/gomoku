/* THIS (.ts) FILE IS GENERATED BY Tapper */
/* eslint-disable */
/* tslint:disable */

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.ApproveRematchMessage */
export type ApproveRematchMessage = {
  /** Transpiled from string */
  gameId: string;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.ApproveUndoMessage */
export type ApproveUndoMessage = {
  /** Transpiled from string */
  gameId: string;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.GetClockMessage */
export type GetClockMessage = {
  /** Transpiled from string */
  gameId: string;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.MakeMoveClientMessage */
export type MakeMoveClientMessage = {
  /** Transpiled from string */
  gameId: string;
  /** Transpiled from int */
  x: number;
  /** Transpiled from int */
  y: number;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.ReceiveInvitationToPlayMessage */
export type ReceiveInvitationToPlayMessage = {
  /** Transpiled from string */
  invitationFromPlayerId: string;
  /** Transpiled from string */
  invitationFromUserName: string;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.RematchRequestMessage */
export type RematchRequestMessage = {
  /** Transpiled from string */
  gameId: string;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.RequestUndoMessage */
export type RequestUndoMessage = {
  /** Transpiled from string */
  gameId: string;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.ResignClientMessage */
export type ResignClientMessage = {
  /** Transpiled from string */
  gameId: string;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.ChatMessageClientMessage */
export type ChatMessageClientMessage = {
  /** Transpiled from string */
  gameId: string;
  /** Transpiled from string */
  user: string;
  /** Transpiled from string */
  message: string;
};

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.SendInvitationToPlayMessage */
export type SendInvitationToPlayMessage = {
  /** Transpiled from string */
  playerId: string;
};
