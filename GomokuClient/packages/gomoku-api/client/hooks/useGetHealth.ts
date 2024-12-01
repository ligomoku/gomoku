import client from "../../http";
import {
  useQuery,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type {
  GetHealthQueryResponse,
  GetHealthHeaderParams,
} from "../models/GetHealth";
import type {
  QueryObserverOptions,
  UseQueryResult,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

type GetHealthClient = typeof client<GetHealthQueryResponse, Error, never>;
type GetHealth = {
  data: GetHealthQueryResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: never;
  headerParams: GetHealthHeaderParams;
  response: GetHealthQueryResponse;
  client: {
    parameters: Partial<Parameters<GetHealthClient>[0]>;
    return: Awaited<ReturnType<GetHealthClient>>;
  };
};
export const getHealthQueryKey = () => [{ url: "/health" }] as const;
export type GetHealthQueryKey = ReturnType<typeof getHealthQueryKey>;
export function getHealthQueryOptions(
  headers?: GetHealth["headerParams"],
  options: GetHealth["client"]["parameters"] = {},
) {
  const queryKey = getHealthQueryKey();
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<GetHealth["data"], GetHealth["error"]>({
        method: "get",
        url: `/health`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @summary Health check endpoint
 * @link /health
 */
export function useGetHealth<
  TData = GetHealth["response"],
  TQueryData = GetHealth["response"],
  TQueryKey extends QueryKey = GetHealthQueryKey,
>(
  headers?: GetHealth["headerParams"],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetHealth["response"],
        GetHealth["error"],
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: GetHealth["client"]["parameters"];
  } = {},
): UseQueryResult<TData, GetHealth["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getHealthQueryKey();
  const query = useQuery({
    ...(getHealthQueryOptions(
      headers,
      clientOptions,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<TData, GetHealth["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
export const getHealthSuspenseQueryKey = () => [{ url: "/health" }] as const;
export type GetHealthSuspenseQueryKey = ReturnType<
  typeof getHealthSuspenseQueryKey
>;
export function getHealthSuspenseQueryOptions(
  headers?: GetHealth["headerParams"],
  options: GetHealth["client"]["parameters"] = {},
) {
  const queryKey = getHealthSuspenseQueryKey();
  return queryOptions({
    queryKey,
    queryFn: async () => {
      const res = await client<GetHealth["data"], GetHealth["error"]>({
        method: "get",
        url: `/health`,
        headers: { ...headers, ...options.headers },
        ...options,
      });
      return res.data;
    },
  });
}
/**
 * @summary Health check endpoint
 * @link /health
 */
export function useGetHealthSuspense<
  TData = GetHealth["response"],
  TQueryKey extends QueryKey = GetHealthSuspenseQueryKey,
>(
  headers?: GetHealth["headerParams"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetHealth["response"],
        GetHealth["error"],
        TData,
        TQueryKey
      >
    >;
    client?: GetHealth["client"]["parameters"];
  } = {},
): UseSuspenseQueryResult<TData, GetHealth["error"]> & {
  queryKey: TQueryKey;
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getHealthSuspenseQueryKey();
  const query = useSuspenseQuery({
    ...(getHealthSuspenseQueryOptions(
      headers,
      clientOptions,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<TData, GetHealth["error"]> & {
    queryKey: TQueryKey;
  };
  query.queryKey = queryKey as TQueryKey;
  return query;
}
