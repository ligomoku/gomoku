// This file is auto-generated by @hey-api/openapi-ts

export type AddPlayerToGameResponse = {
  gameId?: string | null;
  playerId?: string | null;
};

export type ChatMessageClientMessage = {
  gameId: string;
  user: string;
  message: string;
};

export type CreateGameRequest = {
  boardSize: number;
};

export type CreateGameResponse = {
  gameId?: string | null;
  boardSize?: number;
  playerId?: string | null;
};

export type GetAvailableGamesResponse = {
  gameId: string;
  opponent: ProfileDto;
};

export type GetAvailableGamesResponseIenumerablePaginatedResponse = {
  data: Array<GetAvailableGamesResponse>;
  metadata: PaginationMetadata;
};

export type GetGameHistoryResponse = {
  boardSize: number;
  movesCount: number;
  players: UsernamesDto;
  movesHistory: {
    [key: string]: TileDto;
  };
};

export type GetGamesByUsernameResponse = {
  gameId: string;
  players: UsernamesDto;
  winner?: string | null;
  gen: string;
  date: Date;
};

export type GetGamesByUsernameResponseIenumerablePaginatedResponse = {
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

export type TileDto = {
  x: number;
  y: number;
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
  GetAvailableGamesResponseIenumerablePaginatedResponse;

export type GetApiGamesAvailableToJoinError = unknown;

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

export type PostApiGameByGameIdJoinResponse = AddPlayerToGameResponse | void;

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
  GetGamesByUsernameResponseIenumerablePaginatedResponse;

export type GetApiProfilesByUserNameGamesError = unknown;

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
    messageRequest?: ChatMessageClientMessage;
  };
};

export type GetApiProfilesByUserNameGamesResponseTransformer = (
  data: any,
) => Promise<GetApiProfilesByUserNameGamesResponse>;

export type GetGamesByUsernameResponseIenumerablePaginatedResponseModelResponseTransformer =
  (data: any) => GetGamesByUsernameResponseIenumerablePaginatedResponse;

export type GetGamesByUsernameResponseModelResponseTransformer = (
  data: any,
) => GetGamesByUsernameResponse;

export const GetGamesByUsernameResponseModelResponseTransformer: GetGamesByUsernameResponseModelResponseTransformer =
  (data) => {
    if (data?.date) {
      data.date = new Date(data.date);
    }
    return data;
  };

export const GetGamesByUsernameResponseIenumerablePaginatedResponseModelResponseTransformer: GetGamesByUsernameResponseIenumerablePaginatedResponseModelResponseTransformer =
  (data) => {
    if (Array.isArray(data?.data)) {
      data.data.forEach(GetGamesByUsernameResponseModelResponseTransformer);
    }
    return data;
  };

export const GetApiProfilesByUserNameGamesResponseTransformer: GetApiProfilesByUserNameGamesResponseTransformer =
  async (data) => {
    GetGamesByUsernameResponseIenumerablePaginatedResponseModelResponseTransformer(
      data,
    );
    return data;
  };
