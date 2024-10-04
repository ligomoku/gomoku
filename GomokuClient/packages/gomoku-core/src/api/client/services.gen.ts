// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
} from "@hey-api/client-fetch";
import type {
  GetApiGameByGameIdHistoryData,
  GetApiGameByGameIdHistoryError,
  GetApiGameByGameIdHistoryResponse,
  GetApiGamesAvailableToJoinData,
  GetApiGamesAvailableToJoinError,
  GetApiGamesAvailableToJoinResponse,
  PostApiGameData,
  PostApiGameError,
  PostApiGameResponse,
  PostApiGameByGameIdJoinData,
  PostApiGameByGameIdJoinError,
  PostApiGameByGameIdJoinResponse,
  GetHealthData,
  GetHealthError,
  GetHealthResponse,
  PostGamehubJoinGameGroupData,
  PostGamehubMakeMoveData,
  PostGamehubSendMessageData,
} from "./types.gen";

export const client = createClient(createConfig());

/**
 * Get game history by game id
 */
export const getApiGameByGameIdHistory = <ThrowOnError extends boolean = false>(
  options: Options<GetApiGameByGameIdHistoryData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiGameByGameIdHistoryResponse,
    GetApiGameByGameIdHistoryError,
    ThrowOnError
  >({
    ...options,
    url: "/api/game/{gameId}/history",
  });
};

/**
 * Get all games, which are available to join
 */
export const getApiGamesAvailableToJoin = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiGamesAvailableToJoinData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiGamesAvailableToJoinResponse,
    GetApiGamesAvailableToJoinError,
    ThrowOnError
  >({
    ...options,
    url: "/api/games/available-to-join",
  });
};

/**
 * Create new game
 */
export const postApiGame = <ThrowOnError extends boolean = false>(
  options: Options<PostApiGameData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiGameResponse,
    PostApiGameError,
    ThrowOnError
  >({
    ...options,
    url: "/api/game",
  });
};

/**
 * Join game
 */
export const postApiGameByGameIdJoin = <ThrowOnError extends boolean = false>(
  options: Options<PostApiGameByGameIdJoinData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiGameByGameIdJoinResponse,
    PostApiGameByGameIdJoinError,
    ThrowOnError
  >({
    ...options,
    url: "/api/game/{gameId}/join",
  });
};

/**
 * Health check endpoint
 */
export const getHealth = <ThrowOnError extends boolean = false>(
  options: Options<GetHealthData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetHealthResponse,
    GetHealthError,
    ThrowOnError
  >({
    ...options,
    url: "/health",
  });
};

export const postGamehubJoinGameGroup = <ThrowOnError extends boolean = false>(
  options?: Options<PostGamehubJoinGameGroupData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<void, unknown, ThrowOnError>({
    ...options,
    url: "/gamehub/JoinGameGroup",
  });
};

export const postGamehubMakeMove = <ThrowOnError extends boolean = false>(
  options?: Options<PostGamehubMakeMoveData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<void, unknown, ThrowOnError>({
    ...options,
    url: "/gamehub/MakeMove",
  });
};

export const postGamehubSendMessage = <ThrowOnError extends boolean = false>(
  options?: Options<PostGamehubSendMessageData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<void, unknown, ThrowOnError>({
    ...options,
    url: "/gamehub/SendMessage",
  });
};
