import client from "../../http";
import {
  useQuery,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type {
  GetApiGameAnonymousAvailableToJoinQueryResponse,
  GetApiGameAnonymousAvailableToJoinQueryParams,
  GetApiGameAnonymousAvailableToJoinHeaderParams,
} from "../models/GetApiGameAnonymousAvailableToJoin";
import type {
  QueryObserverOptions,
  UseQueryResult,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

type GetApiGameAnonymousAvailableToJoinClient = typeof client<
  GetApiGameAnonymousAvailableToJoinQueryResponse,
  Error,
  never
>;
type GetApiGameAnonymousAvailableToJoin = {
  data: GetApiGameAnonymousAvailableToJoinQueryResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: GetApiGameAnonymousAvailableToJoinQueryParams;
  headerParams: GetApiGameAnonymousAvailableToJoinHeaderParams;
  response: GetApiGameAnonymousAvailableToJoinQueryResponse;
  client: {
    parameters: Partial<
      Parameters<GetApiGameAnonymousAvailableToJoinClient>[0]
    >;
    return: Awaited<ReturnType<GetApiGameAnonymousAvailableToJoinClient>>;
  };
};
export const getApiGameAnonymousAvailableToJoinQueryKey = (
  params?: GetApiGameAnonymousAvailableToJoin["queryParams"],
) =>
  [
    { url: "/api/game/anonymous/available-to-join" },
    ...(params ? [params] : []),
  ] as const;
export type GetApiGameAnonymousAvailableToJoinQueryKey = ReturnType<
  typeof getApiGameAnonymousAvailableToJoinQueryKey
>;
export function getApiGameAnonymousAvailableToJoinQueryOptions(
  params?: GetApiGameAnonymousAvailableToJoin["queryParams"],
  headers?: GetApiGameAnonymousAvailableToJoin["headerParams"],
  options: GetApiGameAnonymousAvailableToJoin["client"]["parameters"] = {},
) {
  const queryKey = getApiGameAnonymousAvailableToJoinQueryKey(params);
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiGameAnonymousAvailableToJoin["data"],
        GetApiGameAnonymousAvailableToJoin["error"]
      >({
        method: "get",
        url: `/api/game/anonymous/available-to-join`,
        params,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @link /api/game/anonymous/available-to-join
 */
export function useGetApiGameAnonymousAvailableToJoin<
  TData = GetApiGameAnonymousAvailableToJoin["response"],
  TQueryData = GetApiGameAnonymousAvailableToJoin["response"],
  TQueryKey extends QueryKey = GetApiGameAnonymousAvailableToJoinQueryKey,
>(
  params?: GetApiGameAnonymousAvailableToJoin["queryParams"],
  headers?: GetApiGameAnonymousAvailableToJoin["headerParams"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetApiGameAnonymousAvailableToJoin["response"],
        GetApiGameAnonymousAvailableToJoin["error"],
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: GetApiGameAnonymousAvailableToJoin["client"]["parameters"];
  } = {},
): UseQueryResult<TData, GetApiGameAnonymousAvailableToJoin["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    getApiGameAnonymousAvailableToJoinQueryKey(params);
  const query = useQuery({
    ...(getApiGameAnonymousAvailableToJoinQueryOptions(
      params,
      headers,
      clientOptions,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, GetApiGameAnonymousAvailableToJoin["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
export const getApiGameAnonymousAvailableToJoinSuspenseQueryKey = (
  params?: GetApiGameAnonymousAvailableToJoin["queryParams"],
) =>
  [
    { url: "/api/game/anonymous/available-to-join" },
    ...(params ? [params] : []),
  ] as const;
export type GetApiGameAnonymousAvailableToJoinSuspenseQueryKey = ReturnType<
  typeof getApiGameAnonymousAvailableToJoinSuspenseQueryKey
>;
export function getApiGameAnonymousAvailableToJoinSuspenseQueryOptions(
  params?: GetApiGameAnonymousAvailableToJoin["queryParams"],
  headers?: GetApiGameAnonymousAvailableToJoin["headerParams"],
  options: GetApiGameAnonymousAvailableToJoin["client"]["parameters"] = {},
) {
  const queryKey = getApiGameAnonymousAvailableToJoinSuspenseQueryKey(params);
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiGameAnonymousAvailableToJoin["data"],
        GetApiGameAnonymousAvailableToJoin["error"]
      >({
        method: "get",
        url: `/api/game/anonymous/available-to-join`,
        params,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @link /api/game/anonymous/available-to-join
 */
export function useGetApiGameAnonymousAvailableToJoinSuspense<
  TData = GetApiGameAnonymousAvailableToJoin["response"],
  TQueryKey extends
    QueryKey = GetApiGameAnonymousAvailableToJoinSuspenseQueryKey,
>(
  params?: GetApiGameAnonymousAvailableToJoin["queryParams"],
  headers?: GetApiGameAnonymousAvailableToJoin["headerParams"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetApiGameAnonymousAvailableToJoin["response"],
        GetApiGameAnonymousAvailableToJoin["error"],
        TData,
        TQueryKey
      >
    >;
    client?: GetApiGameAnonymousAvailableToJoin["client"]["parameters"];
  } = {},
): UseSuspenseQueryResult<
  TData,
  GetApiGameAnonymousAvailableToJoin["error"]
> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ??
    getApiGameAnonymousAvailableToJoinSuspenseQueryKey(params);
  const query = useSuspenseQuery({
    ...(getApiGameAnonymousAvailableToJoinSuspenseQueryOptions(
      params,
      headers,
      clientOptions,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    GetApiGameAnonymousAvailableToJoin["error"]
  > & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
