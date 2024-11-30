import client from "../../http";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiGameAnonymousActiveQueryResponse, GetApiGameAnonymousActiveQueryParams, GetApiGameAnonymousActiveHeaderParams } from "../models/GetApiGameAnonymousActive";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiGameAnonymousActiveClient = typeof client<GetApiGameAnonymousActiveQueryResponse, Error, never>;
type GetApiGameAnonymousActive = {
    data: GetApiGameAnonymousActiveQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: GetApiGameAnonymousActiveQueryParams;
    headerParams: GetApiGameAnonymousActiveHeaderParams;
    response: GetApiGameAnonymousActiveQueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiGameAnonymousActiveClient>[0]>;
        return: Awaited<ReturnType<GetApiGameAnonymousActiveClient>>;
    };
};
export const getApiGameAnonymousActiveQueryKey = (params?: GetApiGameAnonymousActive["queryParams"]) => [{ url: "/api/game/anonymous/active" }, ...(params ? [params] : [])] as const;
export type GetApiGameAnonymousActiveQueryKey = ReturnType<typeof getApiGameAnonymousActiveQueryKey>;
export function getApiGameAnonymousActiveQueryOptions(headers: GetApiGameAnonymousActive["headerParams"], params?: GetApiGameAnonymousActive["queryParams"], options: GetApiGameAnonymousActive["client"]["parameters"] = {}) {
    const queryKey = getApiGameAnonymousActiveQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiGameAnonymousActive["data"], GetApiGameAnonymousActive["error"]>({
                method: "get",
                url: `/api/game/anonymous/active`,
                params,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /api/game/anonymous/active
 */
export function useGetApiGameAnonymousActive<TData = GetApiGameAnonymousActive["response"], TQueryData = GetApiGameAnonymousActive["response"], TQueryKey extends QueryKey = GetApiGameAnonymousActiveQueryKey>(headers: GetApiGameAnonymousActive["headerParams"], params?: GetApiGameAnonymousActive["queryParams"], options: {
    query?: Partial<QueryObserverOptions<GetApiGameAnonymousActive["response"], GetApiGameAnonymousActive["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiGameAnonymousActive["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiGameAnonymousActive["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameAnonymousActiveQueryKey(params);
    const query = useQuery({
        ...getApiGameAnonymousActiveQueryOptions(headers, params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiGameAnonymousActive["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiGameAnonymousActiveSuspenseQueryKey = (params?: GetApiGameAnonymousActive["queryParams"]) => [{ url: "/api/game/anonymous/active" }, ...(params ? [params] : [])] as const;
export type GetApiGameAnonymousActiveSuspenseQueryKey = ReturnType<typeof getApiGameAnonymousActiveSuspenseQueryKey>;
export function getApiGameAnonymousActiveSuspenseQueryOptions(headers: GetApiGameAnonymousActive["headerParams"], params?: GetApiGameAnonymousActive["queryParams"], options: GetApiGameAnonymousActive["client"]["parameters"] = {}) {
    const queryKey = getApiGameAnonymousActiveSuspenseQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiGameAnonymousActive["data"], GetApiGameAnonymousActive["error"]>({
                method: "get",
                url: `/api/game/anonymous/active`,
                params,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /api/game/anonymous/active
 */
export function useGetApiGameAnonymousActiveSuspense<TData = GetApiGameAnonymousActive["response"], TQueryKey extends QueryKey = GetApiGameAnonymousActiveSuspenseQueryKey>(headers: GetApiGameAnonymousActive["headerParams"], params?: GetApiGameAnonymousActive["queryParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameAnonymousActive["response"], GetApiGameAnonymousActive["error"], TData, TQueryKey>>;
    client?: GetApiGameAnonymousActive["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiGameAnonymousActive["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameAnonymousActiveSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getApiGameAnonymousActiveSuspenseQueryOptions(headers, params, clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiGameAnonymousActive["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}