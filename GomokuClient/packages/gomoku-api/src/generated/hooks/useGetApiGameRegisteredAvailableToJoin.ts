import client from "@gomoku/api/src/client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiGameRegisteredAvailableToJoinQueryResponse, GetApiGameRegisteredAvailableToJoinQueryParams, GetApiGameRegisteredAvailableToJoinHeaderParams } from "../models/GetApiGameRegisteredAvailableToJoin";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiGameRegisteredAvailableToJoinClient = typeof client<GetApiGameRegisteredAvailableToJoinQueryResponse, Error, never>;
type GetApiGameRegisteredAvailableToJoin = {
    data: GetApiGameRegisteredAvailableToJoinQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: GetApiGameRegisteredAvailableToJoinQueryParams;
    headerParams: GetApiGameRegisteredAvailableToJoinHeaderParams;
    response: GetApiGameRegisteredAvailableToJoinQueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiGameRegisteredAvailableToJoinClient>[0]>;
        return: Awaited<ReturnType<GetApiGameRegisteredAvailableToJoinClient>>;
    };
};
export const getApiGameRegisteredAvailableToJoinQueryKey = (params?: GetApiGameRegisteredAvailableToJoin["queryParams"]) => [{ url: "/api/game/registered/available-to-join" }, ...(params ? [params] : [])] as const;
export type GetApiGameRegisteredAvailableToJoinQueryKey = ReturnType<typeof getApiGameRegisteredAvailableToJoinQueryKey>;
export function getApiGameRegisteredAvailableToJoinQueryOptions(headers: GetApiGameRegisteredAvailableToJoin["headerParams"], params?: GetApiGameRegisteredAvailableToJoin["queryParams"], options: GetApiGameRegisteredAvailableToJoin["client"]["parameters"] = {}) {
    const queryKey = getApiGameRegisteredAvailableToJoinQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiGameRegisteredAvailableToJoin["data"], GetApiGameRegisteredAvailableToJoin["error"]>({
                method: "get",
                url: `/api/game/registered/available-to-join`,
                params,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /api/game/registered/available-to-join
 */
export function useGetApiGameRegisteredAvailableToJoin<TData = GetApiGameRegisteredAvailableToJoin["response"], TQueryData = GetApiGameRegisteredAvailableToJoin["response"], TQueryKey extends QueryKey = GetApiGameRegisteredAvailableToJoinQueryKey>(headers: GetApiGameRegisteredAvailableToJoin["headerParams"], params?: GetApiGameRegisteredAvailableToJoin["queryParams"], options: {
    query?: Partial<QueryObserverOptions<GetApiGameRegisteredAvailableToJoin["response"], GetApiGameRegisteredAvailableToJoin["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiGameRegisteredAvailableToJoin["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiGameRegisteredAvailableToJoin["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredAvailableToJoinQueryKey(params);
    const query = useQuery({
        ...getApiGameRegisteredAvailableToJoinQueryOptions(headers, params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiGameRegisteredAvailableToJoin["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiGameRegisteredAvailableToJoinSuspenseQueryKey = (params?: GetApiGameRegisteredAvailableToJoin["queryParams"]) => [{ url: "/api/game/registered/available-to-join" }, ...(params ? [params] : [])] as const;
export type GetApiGameRegisteredAvailableToJoinSuspenseQueryKey = ReturnType<typeof getApiGameRegisteredAvailableToJoinSuspenseQueryKey>;
export function getApiGameRegisteredAvailableToJoinSuspenseQueryOptions(headers: GetApiGameRegisteredAvailableToJoin["headerParams"], params?: GetApiGameRegisteredAvailableToJoin["queryParams"], options: GetApiGameRegisteredAvailableToJoin["client"]["parameters"] = {}) {
    const queryKey = getApiGameRegisteredAvailableToJoinSuspenseQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiGameRegisteredAvailableToJoin["data"], GetApiGameRegisteredAvailableToJoin["error"]>({
                method: "get",
                url: `/api/game/registered/available-to-join`,
                params,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /api/game/registered/available-to-join
 */
export function useGetApiGameRegisteredAvailableToJoinSuspense<TData = GetApiGameRegisteredAvailableToJoin["response"], TQueryKey extends QueryKey = GetApiGameRegisteredAvailableToJoinSuspenseQueryKey>(headers: GetApiGameRegisteredAvailableToJoin["headerParams"], params?: GetApiGameRegisteredAvailableToJoin["queryParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameRegisteredAvailableToJoin["response"], GetApiGameRegisteredAvailableToJoin["error"], TData, TQueryKey>>;
    client?: GetApiGameRegisteredAvailableToJoin["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiGameRegisteredAvailableToJoin["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredAvailableToJoinSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getApiGameRegisteredAvailableToJoinSuspenseQueryOptions(headers, params, clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiGameRegisteredAvailableToJoin["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}