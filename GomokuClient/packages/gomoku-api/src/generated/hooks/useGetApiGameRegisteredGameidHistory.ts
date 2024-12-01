import client from "@gomoku/api/src/client";
import {
  useQuery,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type {
  GetApiGameRegisteredGameidHistoryQueryResponse,
  GetApiGameRegisteredGameidHistoryPathParams,
  GetApiGameRegisteredGameidHistoryHeaderParams,
  GetApiGameRegisteredGameidHistory404,
} from "../models/GetApiGameRegisteredGameidHistory";
import type {
  QueryObserverOptions,
  UseQueryResult,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

type GetApiGameRegisteredGameidHistoryClient = typeof client<
  GetApiGameRegisteredGameidHistoryQueryResponse,
  GetApiGameRegisteredGameidHistory404,
  never
>;
type GetApiGameRegisteredGameidHistory = {
  data: GetApiGameRegisteredGameidHistoryQueryResponse;
  error: GetApiGameRegisteredGameidHistory404;
  request: never;
  pathParams: GetApiGameRegisteredGameidHistoryPathParams;
  queryParams: never;
  headerParams: GetApiGameRegisteredGameidHistoryHeaderParams;
  response: GetApiGameRegisteredGameidHistoryQueryResponse;
  client: {
    parameters: Partial<Parameters<GetApiGameRegisteredGameidHistoryClient>[0]>;
    return: Awaited<ReturnType<GetApiGameRegisteredGameidHistoryClient>>;
  };
};
export const getApiGameRegisteredGameidHistoryQueryKey = (
  gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"],
) =>
  [
    { url: "/api/game/registered/:gameId/history", params: { gameId: gameId } },
  ] as const;
export type GetApiGameRegisteredGameidHistoryQueryKey = ReturnType<
  typeof getApiGameRegisteredGameidHistoryQueryKey
>;
export function getApiGameRegisteredGameidHistoryQueryOptions(
  gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"],
  headers: GetApiGameRegisteredGameidHistory["headerParams"],
  options: GetApiGameRegisteredGameidHistory["client"]["parameters"] = {},
) {
  const queryKey = getApiGameRegisteredGameidHistoryQueryKey(gameId);
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiGameRegisteredGameidHistory["data"],
        GetApiGameRegisteredGameidHistory["error"]
      >({
        method: "get",
        url: `/api/game/registered/${gameId}/history`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @link /api/game/registered/:gameId/history
 */
export function useGetApiGameRegisteredGameidHistory<
  TData = GetApiGameRegisteredGameidHistory["response"],
  TQueryData = GetApiGameRegisteredGameidHistory["response"],
  TQueryKey extends QueryKey = GetApiGameRegisteredGameidHistoryQueryKey,
>(
  gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"],
  headers: GetApiGameRegisteredGameidHistory["headerParams"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetApiGameRegisteredGameidHistory["response"],
        GetApiGameRegisteredGameidHistory["error"],
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: GetApiGameRegisteredGameidHistory["client"]["parameters"];
  } = {},
): UseQueryResult<TData, GetApiGameRegisteredGameidHistory["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getApiGameRegisteredGameidHistoryQueryKey(gameId);
  const query = useQuery({
    ...(getApiGameRegisteredGameidHistoryQueryOptions(
      gameId,
      headers,
      clientOptions,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, GetApiGameRegisteredGameidHistory["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
export const getApiGameRegisteredGameidHistorySuspenseQueryKey = (
  gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"],
) =>
  [
    { url: "/api/game/registered/:gameId/history", params: { gameId: gameId } },
  ] as const;
export type GetApiGameRegisteredGameidHistorySuspenseQueryKey = ReturnType<
  typeof getApiGameRegisteredGameidHistorySuspenseQueryKey
>;
export function getApiGameRegisteredGameidHistorySuspenseQueryOptions(
  gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"],
  headers: GetApiGameRegisteredGameidHistory["headerParams"],
  options: GetApiGameRegisteredGameidHistory["client"]["parameters"] = {},
) {
  const queryKey = getApiGameRegisteredGameidHistorySuspenseQueryKey(gameId);
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiGameRegisteredGameidHistory["data"],
        GetApiGameRegisteredGameidHistory["error"]
      >({
        method: "get",
        url: `/api/game/registered/${gameId}/history`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @link /api/game/registered/:gameId/history
 */
export function useGetApiGameRegisteredGameidHistorySuspense<
  TData = GetApiGameRegisteredGameidHistory["response"],
  TQueryKey extends
    QueryKey = GetApiGameRegisteredGameidHistorySuspenseQueryKey,
>(
  gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"],
  headers: GetApiGameRegisteredGameidHistory["headerParams"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetApiGameRegisteredGameidHistory["response"],
        GetApiGameRegisteredGameidHistory["error"],
        TData,
        TQueryKey
      >
    >;
    client?: GetApiGameRegisteredGameidHistory["client"]["parameters"];
  } = {},
): UseSuspenseQueryResult<TData, GetApiGameRegisteredGameidHistory["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    getApiGameRegisteredGameidHistorySuspenseQueryKey(gameId);
  const query = useSuspenseQuery({
    ...(getApiGameRegisteredGameidHistorySuspenseQueryOptions(
      gameId,
      headers,
      clientOptions,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    GetApiGameRegisteredGameidHistory["error"]
  > & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
