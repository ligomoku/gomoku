// This file is auto-generated by @hey-api/openapi-ts

export type AddAnonymousPlayerToGameRequest = {
  playerId: string | null;
};

export type AddPlayerToGameResponse = {
  gameId: string;
  playerId: string;
};

export type ApproveRematchMessage = {
  gameId: string | null;
};

export type ApproveUndoMessage = {
  gameId: string;
};

export type ChatMessageClientMessage = {
  gameId: string;
  user: string;
  message: string;
};

export type ClockDto = {
  black: number;
  white: number;
};

export type CreateGameRequest = {
  boardSize: number;
  timeControl?: TimeControlDto;
};

export type CreateGameResponse = {
  gameId: string;
  boardSize: number;
};

export type GetActiveGamesResponse = {
  gameId: string;
  players?: PlayersDto;
  timeControl?: TimeControlDto;
};

export type GetActiveGamesResponseIEnumerablePaginatedResponse = {
  data: Array<GetActiveGamesResponse>;
  metadata: PaginationMetadata;
};

export type GetAvailableGamesResponse = {
  gameId: string;
  opponent?: ProfileDto;
  timeControl?: TimeControlDto;
};

export type GetAvailableGamesResponseIEnumerablePaginatedResponse = {
  data: Array<GetAvailableGamesResponse>;
  metadata: PaginationMetadata;
};

export type GetClockMessage = {
  gameId: string;
};

export type GetGameHistoryResponse = {
  boardSize: number;
  gen: string;
  movesCount: number;
  players: PlayersDto;
  isGameStarted: boolean;
  hasBothPlayersJoined: boolean;
  isCompleted: boolean;
  winner?: string | null;
  winningSequence?: Array<TileDto> | null;
  movesHistory: {
    [key: string]: TileDto;
  };
  timeControl?: TimeControlDto;
  clock?: ClockDto;
};

export type GetGamesByUsernameResponse = {
  gameId: string;
  players: UsernamesDto;
  isCompleted: boolean;
  winner?: string | null;
  gen: string;
  date: string;
  timeControl?: TimeControlDto;
  clock?: ClockDto;
};

export type GetGamesByUsernameResponseIEnumerablePaginatedResponse = {
  data: Array<GetGamesByUsernameResponse>;
  metadata: PaginationMetadata;
};

export type MakeMoveClientMessage = {
  gameId: string;
  x: number;
  y: number;
};

export type PaginationMetadata = {
  hasMoreItems: boolean;
  totalCount: number;
};

export type PlayerDto = {
  playerId: string;
  userName: string;
  color: string;
};

export type PlayersDto = {
  black?: PlayerDto;
  white?: PlayerDto;
};

export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: (unknown | string | number) | undefined;
};

export type ProfileDto = {
  playerId: string;
  userName: string;
};

export type RematchRequestMessage = {
  gameId: string;
};

export type RequestUndoMessage = {
  gameId: string;
};

export type ResignClientMessage = {
  gameId: string;
};

export type SendInvitationToPlayMessage = {
  playerId: string;
};

export type TileDto = {
  x: number;
  y: number;
};

export type TimeControlDto = {
  initialTimeInSeconds: number;
  incrementPerMove: number;
};

export type UsernamesDto = {
  black?: string | null;
  white?: string | null;
};

export type GetApiGameAnonymousByGameIdHistoryData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type GetApiGameAnonymousByGameIdHistoryResponse = GetGameHistoryResponse;

export type GetApiGameAnonymousByGameIdHistoryError = ProblemDetails;

export type GetApiGameAnonymousAvailableToJoinData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  query?: {
    limit?: number;
    offset?: number;
  };
};

export type GetApiGameAnonymousAvailableToJoinResponse =
  GetAvailableGamesResponseIEnumerablePaginatedResponse;

export type GetApiGameAnonymousAvailableToJoinError = unknown;

export type GetApiGameAnonymousActiveData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  query?: {
    limit?: number;
    offset?: number;
  };
};

export type GetApiGameAnonymousActiveResponse =
  GetActiveGamesResponseIEnumerablePaginatedResponse;

export type GetApiGameAnonymousActiveError = unknown;

export type PostApiGameAnonymousData = {
  body?: CreateGameRequest;
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
};

export type PostApiGameAnonymousResponse = CreateGameResponse;

export type PostApiGameAnonymousError = ProblemDetails;

export type PostApiGameAnonymousByGameIdJoinData = {
  body?: AddAnonymousPlayerToGameRequest;
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type PostApiGameAnonymousByGameIdJoinResponse = AddPlayerToGameResponse;

export type PostApiGameAnonymousByGameIdJoinError = ProblemDetails;

export type GetHealthData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
};

export type GetHealthResponse = unknown;

export type GetHealthError = unknown;

export type GetApiProfilesByUserNameGamesData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    userName: string;
  };
  query?: {
    limit?: number;
    offset?: number;
  };
};

export type GetApiProfilesByUserNameGamesResponse =
  GetGamesByUsernameResponseIEnumerablePaginatedResponse;

export type GetApiProfilesByUserNameGamesError = unknown;

export type GetApiGameRegisteredByGameIdHistoryData = {
  headers: {
    Authorization: string;
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type GetApiGameRegisteredByGameIdHistoryResponse =
  GetGameHistoryResponse;

export type GetApiGameRegisteredByGameIdHistoryError = ProblemDetails;

export type GetApiGameRegisteredAvailableToJoinData = {
  headers: {
    Authorization: string;
    "Content-Type": string;
    "X-Version"?: string;
  };
  query?: {
    limit?: number;
    offset?: number;
  };
};

export type GetApiGameRegisteredAvailableToJoinResponse =
  GetAvailableGamesResponseIEnumerablePaginatedResponse;

export type GetApiGameRegisteredAvailableToJoinError = unknown;

export type GetApiGameRegisteredActiveData = {
  headers: {
    Authorization: string;
    "Content-Type": string;
    "X-Version"?: string;
  };
  query?: {
    limit?: number;
    offset?: number;
  };
};

export type GetApiGameRegisteredActiveResponse =
  GetActiveGamesResponseIEnumerablePaginatedResponse;

export type GetApiGameRegisteredActiveError = unknown;

export type PostApiGameRegisteredData = {
  body?: CreateGameRequest;
  headers: {
    Authorization: string;
    "Content-Type": string;
    "X-Version"?: string;
  };
};

export type PostApiGameRegisteredResponse = CreateGameResponse;

export type PostApiGameRegisteredError = ProblemDetails;

export type PostApiGameRegisteredByGameIdJoinData = {
  headers: {
    Authorization: string;
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type PostApiGameRegisteredByGameIdJoinResponse = AddPlayerToGameResponse;

export type PostApiGameRegisteredByGameIdJoinError = ProblemDetails;

export type PostGamehubAnonymousJoinGameGroupData = {
  query?: {
    gameId?: string;
  };
};

export type PostGamehubAnonymousGetClockData = {
  query?: {
    message?: GetClockMessage;
  };
};

export type PostGamehubAnonymousMakeMoveData = {
  query?: {
    message?: MakeMoveClientMessage;
  };
};

export type PostGamehubAnonymousRequestUndoData = {
  query?: {
    message?: RequestUndoMessage;
  };
};

export type PostGamehubAnonymousApproveUndoData = {
  query?: {
    message?: ApproveUndoMessage;
  };
};

export type PostGamehubAnonymousResignData = {
  query?: {
    message?: ResignClientMessage;
  };
};

export type PostGamehubAnonymousRequestRematchData = {
  query?: {
    message?: RematchRequestMessage;
  };
};

export type PostGamehubAnonymousApproveRematchData = {
  query?: {
    message?: ApproveRematchMessage;
  };
};

export type PostGamehubAnonymousSendMessageData = {
  query?: {
    messageRequest?: ChatMessageClientMessage;
  };
};

export type PostGamehubAnonymousSendInvitationToPlayData = {
  query?: {
    _?: SendInvitationToPlayMessage;
  };
};

export type PostGamehubRegisteredJoinGameGroupData = {
  query?: {
    gameId?: string;
  };
};

export type PostGamehubRegisteredGetClockData = {
  query?: {
    message?: GetClockMessage;
  };
};

export type PostGamehubRegisteredMakeMoveData = {
  query?: {
    message?: MakeMoveClientMessage;
  };
};

export type PostGamehubRegisteredRequestUndoData = {
  query?: {
    message?: RequestUndoMessage;
  };
};

export type PostGamehubRegisteredApproveUndoData = {
  query?: {
    message?: ApproveUndoMessage;
  };
};

export type PostGamehubRegisteredResignData = {
  query?: {
    message?: ResignClientMessage;
  };
};

export type PostGamehubRegisteredRequestRematchData = {
  query?: {
    message?: RematchRequestMessage;
  };
};

export type PostGamehubRegisteredApproveRematchData = {
  query?: {
    message?: ApproveRematchMessage;
  };
};

export type PostGamehubRegisteredSendMessageData = {
  query?: {
    messageRequest?: ChatMessageClientMessage;
  };
};

export type PostGamehubRegisteredSendInvitationToPlayData = {
  query?: {
    message?: SendInvitationToPlayMessage;
  };
};
