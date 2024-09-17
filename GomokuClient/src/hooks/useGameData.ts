import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getApiV2GameByGameIdOptions,
  getApiV2GamesOptions,
  postApiV2GameByGameIdJoinByPlayerIdOptions,
  postApiV2GameByGameIdMakeMoveByPlayerIdOptions,
  postApiV2GameMutation,
  postApiV2GameByGameIdJoinByPlayerIdMutation,
  postApiV2GameByGameIdMakeMoveByPlayerIdMutation,
  postApiV2PlayersMutation,
} from "../api/client/@tanstack/react-query.gen.ts";
import { createRequestOptions } from "../utils/createRequestOption.ts";

export const useGetGameByGameId = (gameId: string) =>
  useQuery(
    getApiV2GameByGameIdOptions(
      createRequestOptions({
        path: {
          gameId,
        },
      }),
    ),
  );

export const useGetGames = (query?: Record<string, string>) =>
  useQuery(
    getApiV2GamesOptions(
      createRequestOptions({
        query,
      }),
    ),
  );

export const usePostGame = () => useMutation(postApiV2GameMutation());

export const useJoinGameByGameIdAndPlayerId = (
  gameId: string,
  playerId: string,
) =>
  useQuery(
    postApiV2GameByGameIdJoinByPlayerIdOptions(
      createRequestOptions({
        path: {
          gameId,
          playerId,
        },
      }),
    ),
  );

export const useJoinGameByGameIdAndPlayerIdMutation = () =>
  useMutation(postApiV2GameByGameIdJoinByPlayerIdMutation());

export const useMakeMoveByGameIdAndPlayerId = (
  gameId: string,
  playerId: string,
) =>
  useQuery(
    postApiV2GameByGameIdMakeMoveByPlayerIdOptions(
      createRequestOptions({
        path: {
          gameId,
          playerId,
        },
      }),
    ),
  );

export const useMakeMoveByGameIdAndPlayerIdMutation = () =>
  useMutation(postApiV2GameByGameIdMakeMoveByPlayerIdMutation());

export const usePostPlayers = () => useMutation(postApiV2PlayersMutation());
