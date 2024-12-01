import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameRegisteredActiveQueryResponse, GetApiGameRegisteredActiveQueryParams, GetApiGameRegisteredActiveHeaderParams } from "../../types/GetApiGameRegisteredActive.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getApiGameRegisteredActiveQueryKey = (params?: GetApiGameRegisteredActiveQueryParams) => [{ url: "/api/game/registered/active" }, ...(params ? [params] : [])] as const;

 export type GetApiGameRegisteredActiveQueryKey = ReturnType<typeof getApiGameRegisteredActiveQueryKey>;

 /**
 * {@link /api/game/registered/active}
 */
async function getApiGameRegisteredActive({ headers, params }: {
    headers: GetApiGameRegisteredActiveHeaderParams;
    params?: GetApiGameRegisteredActiveQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetApiGameRegisteredActiveQueryResponse, Error, unknown>({ method: "GET", url: `/api/game/registered/active`, params, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getApiGameRegisteredActiveQueryOptions({ headers, params }: {
    headers: GetApiGameRegisteredActiveHeaderParams;
    params?: GetApiGameRegisteredActiveQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameRegisteredActiveQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getApiGameRegisteredActive({ headers, params }, config);
        },
    });
}

 /**
 * {@link /api/game/registered/active}
 */
export function useGetApiGameRegisteredActive<TData = GetApiGameRegisteredActiveQueryResponse, TQueryData = GetApiGameRegisteredActiveQueryResponse, TQueryKey extends QueryKey = GetApiGameRegisteredActiveQueryKey>({ headers, params }: {
    headers: GetApiGameRegisteredActiveHeaderParams;
    params?: GetApiGameRegisteredActiveQueryParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetApiGameRegisteredActiveQueryResponse, Error, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredActiveQueryKey(params);
    const query = useQuery({
        ...getApiGameRegisteredActiveQueryOptions({ headers, params }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}