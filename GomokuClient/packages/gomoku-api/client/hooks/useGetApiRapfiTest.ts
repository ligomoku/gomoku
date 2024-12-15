import client from "../../http";
import {
  useQuery,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type {
  GetApiRapfiTestQueryResponse,
  GetApiRapfiTestHeaderParams,
  GetApiRapfiTest500,
} from "../models/GetApiRapfiTest";
import type {
  QueryObserverOptions,
  UseQueryResult,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

type GetApiRapfiTestClient = typeof client<
  GetApiRapfiTestQueryResponse,
  GetApiRapfiTest500,
  never
>;
type GetApiRapfiTest = {
  data: GetApiRapfiTestQueryResponse;
  error: GetApiRapfiTest500;
  request: never;
  pathParams: never;
  queryParams: never;
  headerParams: GetApiRapfiTestHeaderParams;
  response: GetApiRapfiTestQueryResponse;
  client: {
    parameters: Partial<Parameters<GetApiRapfiTestClient>[0]>;
    return: Awaited<ReturnType<GetApiRapfiTestClient>>;
  };
};
export const getApiRapfiTestQueryKey = () =>
  [{ url: "/api/rapfi/test" }] as const;
export type GetApiRapfiTestQueryKey = ReturnType<
  typeof getApiRapfiTestQueryKey
>;
export function getApiRapfiTestQueryOptions(
  headers?: GetApiRapfiTest["headerParams"],
  options: GetApiRapfiTest["client"]["parameters"] = {},
) {
  const queryKey = getApiRapfiTestQueryKey();
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiRapfiTest["data"],
        GetApiRapfiTest["error"]
      >({
        method: "get",
        url: `/api/rapfi/test`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @summary Test connection with Rapfi engine
 * @link /api/rapfi/test
 */
export function useGetApiRapfiTest<
  TData = GetApiRapfiTest["response"],
  TQueryData = GetApiRapfiTest["response"],
  TQueryKey extends QueryKey = GetApiRapfiTestQueryKey,
>(
  headers?: GetApiRapfiTest["headerParams"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetApiRapfiTest["response"],
        GetApiRapfiTest["error"],
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: GetApiRapfiTest["client"]["parameters"];
  } = {},
): UseQueryResult<TData, GetApiRapfiTest["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getApiRapfiTestQueryKey();
  const query = useQuery({
    ...(getApiRapfiTestQueryOptions(
      headers,
      clientOptions,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, GetApiRapfiTest["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
export const getApiRapfiTestSuspenseQueryKey = () =>
  [{ url: "/api/rapfi/test" }] as const;
export type GetApiRapfiTestSuspenseQueryKey = ReturnType<
  typeof getApiRapfiTestSuspenseQueryKey
>;
export function getApiRapfiTestSuspenseQueryOptions(
  headers?: GetApiRapfiTest["headerParams"],
  options: GetApiRapfiTest["client"]["parameters"] = {},
) {
  const queryKey = getApiRapfiTestSuspenseQueryKey();
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiRapfiTest["data"],
        GetApiRapfiTest["error"]
      >({
        method: "get",
        url: `/api/rapfi/test`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @summary Test connection with Rapfi engine
 * @link /api/rapfi/test
 */
export function useGetApiRapfiTestSuspense<
  TData = GetApiRapfiTest["response"],
  TQueryKey extends QueryKey = GetApiRapfiTestSuspenseQueryKey,
>(
  headers?: GetApiRapfiTest["headerParams"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetApiRapfiTest["response"],
        GetApiRapfiTest["error"],
        TData,
        TQueryKey
      >
    >;
    client?: GetApiRapfiTest["client"]["parameters"];
  } = {},
): UseSuspenseQueryResult<TData, GetApiRapfiTest["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getApiRapfiTestSuspenseQueryKey();
  const query = useSuspenseQuery({
    ...(getApiRapfiTestSuspenseQueryOptions(
      headers,
      clientOptions,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<TData, GetApiRapfiTest["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
