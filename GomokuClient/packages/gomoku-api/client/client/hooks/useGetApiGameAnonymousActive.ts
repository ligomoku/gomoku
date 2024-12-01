import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameAnonymousActiveQueryResponse, GetApiGameAnonymousActiveQueryParams, GetApiGameAnonymousActiveHeaderParams } from "../../types/GetApiGameAnonymousActive.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getApiGameAnonymousActiveQueryKey = (params?: GetApiGameAnonymousActiveQueryParams) => [{ url: "/api/game/anonymous/active" }, ...(params ? [params] : [])] as const;

 export type GetApiGameAnonymousActiveQueryKey = ReturnType<typeof getApiGameAnonymousActiveQueryKey>;

 /**
 * {@link /api/game/anonymous/active}
 */
async function getApiGameAnonymousActive({ params, headers }: {
    params?: GetApiGameAnonymousActiveQueryParams;
    headers?: GetApiGameAnonymousActiveHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetApiGameAnonymousActiveQueryResponse, Error, unknown>({ method: "GET", url: `/api/game/anonymous/active`, params, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getApiGameAnonymousActiveQueryOptions({ params, headers }: {
    params?: GetApiGameAnonymousActiveQueryParams;
    headers?: GetApiGameAnonymousActiveHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameAnonymousActiveQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getApiGameAnonymousActive({ params, headers }, config);
        },
    });
}

 /**
 * {@link /api/game/anonymous/active}
 */
export function useGetApiGameAnonymousActive<TData = GetApiGameAnonymousActiveQueryResponse, TQueryData = GetApiGameAnonymousActiveQueryResponse, TQueryKey extends QueryKey = GetApiGameAnonymousActiveQueryKey>({ params, headers }: {
    params?: GetApiGameAnonymousActiveQueryParams;
    headers?: GetApiGameAnonymousActiveHeaderParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetApiGameAnonymousActiveQueryResponse, Error, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameAnonymousActiveQueryKey(params);
    const query = useQuery({
        ...getApiGameAnonymousActiveQueryOptions({ params, headers }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}