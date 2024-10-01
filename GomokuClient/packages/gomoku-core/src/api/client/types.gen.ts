// This file is auto-generated by @hey-api/openapi-ts

export type CreateGameRequest = {
  boardSize: number;
};

export type CreateGameResponse = {
  gameId: string;
};

export type GameMoveDto = {
  tile: TileDto;
  playerId: string;
  moveNumber: number;
};

export type GetAvailableGamesResponse = {
  gameId: string;
  opponent: PlayerDto;
};

export type GetGameResponse = {
  gameId: string;
  playerOne?: PlayerDto;
  playerTwo?: PlayerDto;
  hasBothPlayersJoined: boolean;
  isGameStarted: boolean;
  nextMoveShouldMakePlayerId?: string | null;
  winnerId?: string | null;
  winningSequence?: Array<TileDto> | null;
  playersMoves: {
    [key: string]: GameMoveDto;
  };
};

export type MakeMoveClientMessage = {
  gameId: string;
  x: number;
  y: number;
};

export type MakeMoveRequest = {
  x: number;
  y: number;
};

export type PlaceTileResponse = {
  winningSequence?: Array<TileDto> | null;
  readonly isWinningMove?: boolean;
};

export type PlayerDto = {
  playerId: string;
  userName: string;
};

export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: (unknown | string | number) | undefined;
};

export type TileDto = {
  x: number;
  y: number;
};

export type GetApiAuthInfoData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
};

export type GetApiAuthInfoResponse = unknown;

export type GetApiAuthInfoError = unknown;

export type GetApiGameByGameIdData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type GetApiGameByGameIdResponse = GetGameResponse;

export type GetApiGameByGameIdError = ProblemDetails;

export type GetApiGamesData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
};

export type GetApiGamesResponse = Array<GetAvailableGamesResponse>;

export type GetApiGamesError = unknown;

export type PostApiGameData = {
  body?: CreateGameRequest;
  headers: {
    Authorization: string;
    "Content-Type": string;
    "X-Version"?: string;
  };
};

export type PostApiGameResponse = CreateGameResponse;

export type PostApiGameError = ProblemDetails;

export type PostApiGameByGameIdJoinData = {
  headers: {
    Authorization: string;
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type PostApiGameByGameIdJoinResponse = unknown;

export type PostApiGameByGameIdJoinError = ProblemDetails;

export type PostApiGameByGameIdMakeMoveData = {
  body?: MakeMoveRequest;
  headers: {
    Authorization: string;
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type PostApiGameByGameIdMakeMoveResponse = PlaceTileResponse;

export type PostApiGameByGameIdMakeMoveError = ProblemDetails;

export type GetHealthData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
};

export type GetHealthResponse = unknown;

export type GetHealthError = unknown;

export type PostGamehubJoinGameGroupData = {
  query?: {
    gameId?: string;
  };
};

export type PostGamehubMakeMoveData = {
  query?: {
    makeMoveMessage?: MakeMoveClientMessage;
  };
};

export type PostGamehubSendMessageData = {
  query?: {
    packedData?: string;
  };
};

export type PostGamehubReceiveMessageData = {
  query?: {
    message?: string;
    user?: string;
  };
};
