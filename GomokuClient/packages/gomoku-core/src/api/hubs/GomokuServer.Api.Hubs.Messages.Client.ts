/* THIS (.ts) FILE IS GENERATED BY Tapper */
/* eslint-disable */
/* tslint:disable */

/** Transpiled from GomokuServer.Api.Hubs.Messages.Client.MakeMoveClientMessage */
export type MakeMoveClientMessage = {
  /** Transpiled from string */
  gameId: string;
  /** Transpiled from int */
  x: number;
  /** Transpiled from int */
  y: number;
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
