// This file is auto-generated by @hey-api/openapi-ts

export type AddPlayerToGameResponse = {
  gameId: string;
  playerId: string;
};

export type ApproveRematchMessage = {
  gameId: string | null;
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
  opponent?: ProfileDto;
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

export type ResignClientMessage = {
  gameId: string;
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

export type GetApiGameByGameIdHistoryData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type GetApiGameByGameIdHistoryResponse = GetGameHistoryResponse;

export type GetApiGameByGameIdHistoryError = ProblemDetails;

export type GetApiGamesAvailableToJoinData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  query: {
    isAnonymous: boolean;
    limit?: number;
    offset?: number;
  };
};

export type GetApiGamesAvailableToJoinResponse =
  GetAvailableGamesResponseIEnumerablePaginatedResponse;

export type GetApiGamesAvailableToJoinError = unknown;

export type GetApiGamesActiveData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  query?: {
    isAnonymous?: boolean;
    limit?: number;
    offset?: number;
  };
};

export type GetApiGamesActiveResponse =
  GetActiveGamesResponseIEnumerablePaginatedResponse;

export type GetApiGamesActiveError = unknown;

export type PostApiGameData = {
  body?: CreateGameRequest;
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
};

export type PostApiGameResponse = CreateGameResponse;

export type PostApiGameError = ProblemDetails;

export type PostApiGameByGameIdJoinData = {
  headers: {
    "Content-Type": string;
    "X-Version"?: string;
  };
  path: {
    gameId: string;
  };
};

export type PostApiGameByGameIdJoinResponse = AddPlayerToGameResponse;

export type PostApiGameByGameIdJoinError = ProblemDetails;

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

export type PostGamehubJoinGameGroupData = {
  query?: {
    gameId?: string;
  };
};

export type PostGamehubGetClockData = {
  query?: {
    message?: GetClockMessage;
  };
};

export type PostGamehubMakeMoveData = {
  query?: {
    message?: MakeMoveClientMessage;
  };
};

export type PostGamehubResignData = {
  query?: {
    message?: ResignClientMessage;
  };
};

export type PostGamehubRequestRematchData = {
  query?: {
    message?: RematchRequestMessage;
  };
};

export type PostGamehubApproveRematchData = {
  query?: {
    message?: ApproveRematchMessage;
  };
};

export type PostGamehubSendMessageData = {
  query?: {
    messageRequest?: ChatMessageClientMessage;
  };
};
