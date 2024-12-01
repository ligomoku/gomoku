import client from "../../http";
import {
  useQuery,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type {
  GetApiProfilesUsernameGamesQueryResponse,
  GetApiProfilesUsernameGamesPathParams,
  GetApiProfilesUsernameGamesQueryParams,
  GetApiProfilesUsernameGamesHeaderParams,
} from "../models/GetApiProfilesUsernameGames";
import type {
  QueryObserverOptions,
  UseQueryResult,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

type GetApiProfilesUsernameGamesClient = typeof client<
  GetApiProfilesUsernameGamesQueryResponse,
  Error,
  never
>;
type GetApiProfilesUsernameGames = {
  data: GetApiProfilesUsernameGamesQueryResponse;
  error: Error;
  request: never;
  pathParams: GetApiProfilesUsernameGamesPathParams;
  queryParams: GetApiProfilesUsernameGamesQueryParams;
  headerParams: GetApiProfilesUsernameGamesHeaderParams;
  response: GetApiProfilesUsernameGamesQueryResponse;
  client: {
    parameters: Partial<Parameters<GetApiProfilesUsernameGamesClient>[0]>;
    return: Awaited<ReturnType<GetApiProfilesUsernameGamesClient>>;
  };
};
export const getApiProfilesUsernameGamesQueryKey = (
  userName: GetApiProfilesUsernameGamesPathParams["userName"],
  params?: GetApiProfilesUsernameGames["queryParams"],
) =>
  [
    { url: "/api/profiles/:userName/games", params: { userName: userName } },
    ...(params ? [params] : []),
  ] as const;
export type GetApiProfilesUsernameGamesQueryKey = ReturnType<
  typeof getApiProfilesUsernameGamesQueryKey
>;
export function getApiProfilesUsernameGamesQueryOptions(
  userName: GetApiProfilesUsernameGamesPathParams["userName"],
  params?: GetApiProfilesUsernameGames["queryParams"],
  headers?: GetApiProfilesUsernameGames["headerParams"],
  options: GetApiProfilesUsernameGames["client"]["parameters"] = {},
) {
  const queryKey = getApiProfilesUsernameGamesQueryKey(userName, params);
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiProfilesUsernameGames["data"],
        GetApiProfilesUsernameGames["error"]
      >({
        method: "get",
        url: `/api/profiles/${userName}/games`,
        params,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @summary Get games for specific user
 * @link /api/profiles/:userName/games
 */
export function useGetApiProfilesUsernameGames<
  TData = GetApiProfilesUsernameGames["response"],
  TQueryData = GetApiProfilesUsernameGames["response"],
  TQueryKey extends QueryKey = GetApiProfilesUsernameGamesQueryKey,
>(
  userName: GetApiProfilesUsernameGamesPathParams["userName"],
  params?: GetApiProfilesUsernameGames["queryParams"],
  headers?: GetApiProfilesUsernameGames["headerParams"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetApiProfilesUsernameGames["response"],
        GetApiProfilesUsernameGames["error"],
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: GetApiProfilesUsernameGames["client"]["parameters"];
  } = {},
): UseQueryResult<TData, GetApiProfilesUsernameGames["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    getApiProfilesUsernameGamesQueryKey(userName, params);
  const query = useQuery({
    ...(getApiProfilesUsernameGamesQueryOptions(
      userName,
      params,
      headers,
      clientOptions,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, GetApiProfilesUsernameGames["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
export const getApiProfilesUsernameGamesSuspenseQueryKey = (
  userName: GetApiProfilesUsernameGamesPathParams["userName"],
  params?: GetApiProfilesUsernameGames["queryParams"],
) =>
  [
    { url: "/api/profiles/:userName/games", params: { userName: userName } },
    ...(params ? [params] : []),
  ] as const;
export type GetApiProfilesUsernameGamesSuspenseQueryKey = ReturnType<
  typeof getApiProfilesUsernameGamesSuspenseQueryKey
>;
export function getApiProfilesUsernameGamesSuspenseQueryOptions(
  userName: GetApiProfilesUsernameGamesPathParams["userName"],
  params?: GetApiProfilesUsernameGames["queryParams"],
  headers?: GetApiProfilesUsernameGames["headerParams"],
  options: GetApiProfilesUsernameGames["client"]["parameters"] = {},
) {
  const queryKey = getApiProfilesUsernameGamesSuspenseQueryKey(
    userName,
    params,
  );
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiProfilesUsernameGames["data"],
        GetApiProfilesUsernameGames["error"]
      >({
        method: "get",
        url: `/api/profiles/${userName}/games`,
        params,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @summary Get games for specific user
 * @link /api/profiles/:userName/games
 */
export function useGetApiProfilesUsernameGamesSuspense<
  TData = GetApiProfilesUsernameGames["response"],
  TQueryKey extends QueryKey = GetApiProfilesUsernameGamesSuspenseQueryKey,
>(
  userName: GetApiProfilesUsernameGamesPathParams["userName"],
  params?: GetApiProfilesUsernameGames["queryParams"],
  headers?: GetApiProfilesUsernameGames["headerParams"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetApiProfilesUsernameGames["response"],
        GetApiProfilesUsernameGames["error"],
        TData,
        TQueryKey
      >
    >;
    client?: GetApiProfilesUsernameGames["client"]["parameters"];
  } = {},
): UseSuspenseQueryResult<TData, GetApiProfilesUsernameGames["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    getApiProfilesUsernameGamesSuspenseQueryKey(userName, params);
  const query = useSuspenseQuery({
    ...(getApiProfilesUsernameGamesSuspenseQueryOptions(
      userName,
      params,
      headers,
      clientOptions,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<TData, GetApiProfilesUsernameGames["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
