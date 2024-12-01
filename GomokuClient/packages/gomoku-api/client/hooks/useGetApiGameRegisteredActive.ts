import client from "../../http";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiGameRegisteredActiveQueryResponse, GetApiGameRegisteredActiveQueryParams, GetApiGameRegisteredActiveHeaderParams } from "../models/GetApiGameRegisteredActive";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiGameRegisteredActiveClient = typeof client<GetApiGameRegisteredActiveQueryResponse, Error, never>;
type GetApiGameRegisteredActive = {
    data: GetApiGameRegisteredActiveQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: GetApiGameRegisteredActiveQueryParams;
    headerParams: GetApiGameRegisteredActiveHeaderParams;
    response: GetApiGameRegisteredActiveQueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiGameRegisteredActiveClient>[0]>;
        return: Awaited<ReturnType<GetApiGameRegisteredActiveClient>>;
    };
};
export const getApiGameRegisteredActiveQueryKey = (params?: GetApiGameRegisteredActive["queryParams"]) => [{ url: "/api/game/registered/active" }, ...(params ? [params] : [])] as const;
export type GetApiGameRegisteredActiveQueryKey = ReturnType<typeof getApiGameRegisteredActiveQueryKey>;
export function getApiGameRegisteredActiveQueryOptions(headers: GetApiGameRegisteredActive["headerParams"], params?: GetApiGameRegisteredActive["queryParams"], options: GetApiGameRegisteredActive["client"]["parameters"] = {}) {
    const queryKey = getApiGameRegisteredActiveQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiGameRegisteredActive["data"], GetApiGameRegisteredActive["error"]>({
                method: "get",
                url: `/api/game/registered/active`,
                params,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /api/game/registered/active
 */
export function useGetApiGameRegisteredActive<TData = GetApiGameRegisteredActive["response"], TQueryData = GetApiGameRegisteredActive["response"], TQueryKey extends QueryKey = GetApiGameRegisteredActiveQueryKey>(headers: GetApiGameRegisteredActive["headerParams"], params?: GetApiGameRegisteredActive["queryParams"], options: {
    query?: Partial<QueryObserverOptions<GetApiGameRegisteredActive["response"], GetApiGameRegisteredActive["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiGameRegisteredActive["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiGameRegisteredActive["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredActiveQueryKey(params);
    const query = useQuery({
        ...getApiGameRegisteredActiveQueryOptions(headers, params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiGameRegisteredActive["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiGameRegisteredActiveSuspenseQueryKey = (params?: GetApiGameRegisteredActive["queryParams"]) => [{ url: "/api/game/registered/active" }, ...(params ? [params] : [])] as const;
export type GetApiGameRegisteredActiveSuspenseQueryKey = ReturnType<typeof getApiGameRegisteredActiveSuspenseQueryKey>;
export function getApiGameRegisteredActiveSuspenseQueryOptions(headers: GetApiGameRegisteredActive["headerParams"], params?: GetApiGameRegisteredActive["queryParams"], options: GetApiGameRegisteredActive["client"]["parameters"] = {}) {
    const queryKey = getApiGameRegisteredActiveSuspenseQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiGameRegisteredActive["data"], GetApiGameRegisteredActive["error"]>({
                method: "get",
                url: `/api/game/registered/active`,
                params,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /api/game/registered/active
 */
export function useGetApiGameRegisteredActiveSuspense<TData = GetApiGameRegisteredActive["response"], TQueryKey extends QueryKey = GetApiGameRegisteredActiveSuspenseQueryKey>(headers: GetApiGameRegisteredActive["headerParams"], params?: GetApiGameRegisteredActive["queryParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameRegisteredActive["response"], GetApiGameRegisteredActive["error"], TData, TQueryKey>>;
    client?: GetApiGameRegisteredActive["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiGameRegisteredActive["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredActiveSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getApiGameRegisteredActiveSuspenseQueryOptions(headers, params, clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiGameRegisteredActive["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}