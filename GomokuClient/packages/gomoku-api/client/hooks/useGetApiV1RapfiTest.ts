import client from "../../http";
import {
  useQuery,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type {
  GetApiV1RapfiTestQueryResponse,
  GetApiV1RapfiTestHeaderParams,
  GetApiV1RapfiTest500,
} from "../models/GetApiV1RapfiTest";
import type {
  QueryObserverOptions,
  UseQueryResult,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

type GetApiV1RapfiTestClient = typeof client<
  GetApiV1RapfiTestQueryResponse,
  GetApiV1RapfiTest500,
  never
>;
type GetApiV1RapfiTest = {
  data: GetApiV1RapfiTestQueryResponse;
  error: GetApiV1RapfiTest500;
  request: never;
  pathParams: never;
  queryParams: never;
  headerParams: GetApiV1RapfiTestHeaderParams;
  response: GetApiV1RapfiTestQueryResponse;
  client: {
    parameters: Partial<Parameters<GetApiV1RapfiTestClient>[0]>;
    return: Awaited<ReturnType<GetApiV1RapfiTestClient>>;
  };
};
export const getApiV1RapfiTestQueryKey = () =>
  [{ url: "/api/v1/rapfi/test" }] as const;
export type GetApiV1RapfiTestQueryKey = ReturnType<
  typeof getApiV1RapfiTestQueryKey
>;
export function getApiV1RapfiTestQueryOptions(
  headers?: GetApiV1RapfiTest["headerParams"],
  options: GetApiV1RapfiTest["client"]["parameters"] = {},
) {
  const queryKey = getApiV1RapfiTestQueryKey();
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiV1RapfiTest["data"],
        GetApiV1RapfiTest["error"]
      >({
        method: "get",
        url: `/api/v1/rapfi/test`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @summary Test connection with Rapfi engine
 * @link /api/v1/rapfi/test
 */
export function useGetApiV1RapfiTest<
  TData = GetApiV1RapfiTest["response"],
  TQueryData = GetApiV1RapfiTest["response"],
  TQueryKey extends QueryKey = GetApiV1RapfiTestQueryKey,
>(
  headers?: GetApiV1RapfiTest["headerParams"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetApiV1RapfiTest["response"],
        GetApiV1RapfiTest["error"],
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: GetApiV1RapfiTest["client"]["parameters"];
  } = {},
): UseQueryResult<TData, GetApiV1RapfiTest["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getApiV1RapfiTestQueryKey();
  const query = useQuery({
    ...(getApiV1RapfiTestQueryOptions(
      headers,
      clientOptions,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, GetApiV1RapfiTest["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
export const getApiV1RapfiTestSuspenseQueryKey = () =>
  [{ url: "/api/v1/rapfi/test" }] as const;
export type GetApiV1RapfiTestSuspenseQueryKey = ReturnType<
  typeof getApiV1RapfiTestSuspenseQueryKey
>;
export function getApiV1RapfiTestSuspenseQueryOptions(
  headers?: GetApiV1RapfiTest["headerParams"],
  options: GetApiV1RapfiTest["client"]["parameters"] = {},
) {
  const queryKey = getApiV1RapfiTestSuspenseQueryKey();
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<
        GetApiV1RapfiTest["data"],
        GetApiV1RapfiTest["error"]
      >({
        method: "get",
        url: `/api/v1/rapfi/test`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @summary Test connection with Rapfi engine
 * @link /api/v1/rapfi/test
 */
export function useGetApiV1RapfiTestSuspense<
  TData = GetApiV1RapfiTest["response"],
  TQueryKey extends QueryKey = GetApiV1RapfiTestSuspenseQueryKey,
>(
  headers?: GetApiV1RapfiTest["headerParams"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetApiV1RapfiTest["response"],
        GetApiV1RapfiTest["error"],
        TData,
        TQueryKey
      >
    >;
    client?: GetApiV1RapfiTest["client"]["parameters"];
  } = {},
): UseSuspenseQueryResult<TData, GetApiV1RapfiTest["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getApiV1RapfiTestSuspenseQueryKey();
  const query = useSuspenseQuery({
    ...(getApiV1RapfiTestSuspenseQueryOptions(
      headers,
      clientOptions,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<TData, GetApiV1RapfiTest["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
