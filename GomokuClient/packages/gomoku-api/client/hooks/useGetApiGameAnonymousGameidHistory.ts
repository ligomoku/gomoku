import client from "../../http";
import {
  useQuery,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type {
  GetApiGameAnonymousGameidHistoryQueryResponse,
  GetApiGameAnonymousGameidHistoryPathParams,
  GetApiGameAnonymousGameidHistoryHeaderParams,
  GetApiGameAnonymousGameidHistory404,
} from "../models/GetApiGameAnonymousGameidHistory";
import type {
  QueryObserverOptions,
  UseQueryResult,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

type GetApiGameAnonymousGameidHistoryClient = typeof client<
  GetApiGameAnonymousGameidHistoryQueryResponse,
  GetApiGameAnonymousGameidHistory404,
  never
>;
type GetApiGameAnonymousGameidHistory = {
  data: GetApiGameAnonymousGameidHistoryQueryResponse;
  error: GetApiGameAnonymousGameidHistory404;
  request: never;
  pathParams: GetApiGameAnonymousGameidHistoryPathParams;
  queryParams: never;
  headerParams: GetApiGameAnonymousGameidHistoryHeaderParams;
  response: GetApiGameAnonymousGameidHistoryQueryResponse;
  client: {
    parameters: Partial<Parameters<GetApiGameAnonymousGameidHistoryClient>[0]>;
    return: Awaited<ReturnType<GetApiGameAnonymousGameidHistoryClient>>;
  };
};
export const getApiGameAnonymousGameidHistoryQueryKey = (
  gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"],
) =>
  [
    { url: "/api/game/anonymous/:gameId/history", params: { gameId: gameId } },
  ] as const;
export type GetApiGameAnonymousGameidHistoryQueryKey = ReturnType<
  typeof getApiGameAnonymousGameidHistoryQueryKey
>;
export function getApiGameAnonymousGameidHistoryQueryOptions(
  gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"],
  headers?: GetApiGameAnonymousGameidHistory["headerParams"],
  options: GetApiGameAnonymousGameidHistory["client"]["parameters"] = {},
) {
  const queryKey = getApiGameAnonymousGameidHistoryQueryKey(gameId);
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiGameAnonymousGameidHistory["data"],
        GetApiGameAnonymousGameidHistory["error"]
      >({
        method: "get",
        url: `/api/game/anonymous/${gameId}/history`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @link /api/game/anonymous/:gameId/history
 */
export function useGetApiGameAnonymousGameidHistory<
  TData = GetApiGameAnonymousGameidHistory["response"],
  TQueryData = GetApiGameAnonymousGameidHistory["response"],
  TQueryKey extends QueryKey = GetApiGameAnonymousGameidHistoryQueryKey,
>(
  gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"],
  headers?: GetApiGameAnonymousGameidHistory["headerParams"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetApiGameAnonymousGameidHistory["response"],
        GetApiGameAnonymousGameidHistory["error"],
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: GetApiGameAnonymousGameidHistory["client"]["parameters"];
  } = {},
): UseQueryResult<TData, GetApiGameAnonymousGameidHistory["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getApiGameAnonymousGameidHistoryQueryKey(gameId);
  const query = useQuery({
    ...(getApiGameAnonymousGameidHistoryQueryOptions(
      gameId,
      headers,
      clientOptions,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, GetApiGameAnonymousGameidHistory["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
export const getApiGameAnonymousGameidHistorySuspenseQueryKey = (
  gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"],
) =>
  [
    { url: "/api/game/anonymous/:gameId/history", params: { gameId: gameId } },
  ] as const;
export type GetApiGameAnonymousGameidHistorySuspenseQueryKey = ReturnType<
  typeof getApiGameAnonymousGameidHistorySuspenseQueryKey
>;
export function getApiGameAnonymousGameidHistorySuspenseQueryOptions(
  gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"],
  headers?: GetApiGameAnonymousGameidHistory["headerParams"],
  options: GetApiGameAnonymousGameidHistory["client"]["parameters"] = {},
) {
  const queryKey = getApiGameAnonymousGameidHistorySuspenseQueryKey(gameId);
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiGameAnonymousGameidHistory["data"],
        GetApiGameAnonymousGameidHistory["error"]
      >({
        method: "get",
        url: `/api/game/anonymous/${gameId}/history`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @link /api/game/anonymous/:gameId/history
 */
export function useGetApiGameAnonymousGameidHistorySuspense<
  TData = GetApiGameAnonymousGameidHistory["response"],
  TQueryKey extends QueryKey = GetApiGameAnonymousGameidHistorySuspenseQueryKey,
>(
  gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"],
  headers?: GetApiGameAnonymousGameidHistory["headerParams"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetApiGameAnonymousGameidHistory["response"],
        GetApiGameAnonymousGameidHistory["error"],
        TData,
        TQueryKey
      >
    >;
    client?: GetApiGameAnonymousGameidHistory["client"]["parameters"];
  } = {},
): UseSuspenseQueryResult<TData, GetApiGameAnonymousGameidHistory["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    getApiGameAnonymousGameidHistorySuspenseQueryKey(gameId);
  const query = useSuspenseQuery({
    ...(getApiGameAnonymousGameidHistorySuspenseQueryOptions(
      gameId,
      headers,
      clientOptions,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    GetApiGameAnonymousGameidHistory["error"]
  > & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
