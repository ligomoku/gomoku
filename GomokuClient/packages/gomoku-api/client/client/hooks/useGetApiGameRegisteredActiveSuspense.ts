import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameRegisteredActiveQueryResponse, GetApiGameRegisteredActiveQueryParams, GetApiGameRegisteredActiveHeaderParams } from "../../types/GetApiGameRegisteredActive.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getApiGameRegisteredActiveSuspenseQueryKey = (params?: GetApiGameRegisteredActiveQueryParams) => [{ url: "/api/game/registered/active" }, ...(params ? [params] : [])] as const;

 export type GetApiGameRegisteredActiveSuspenseQueryKey = ReturnType<typeof getApiGameRegisteredActiveSuspenseQueryKey>;

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

 export function getApiGameRegisteredActiveSuspenseQueryOptions({ headers, params }: {
    headers: GetApiGameRegisteredActiveHeaderParams;
    params?: GetApiGameRegisteredActiveQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameRegisteredActiveSuspenseQueryKey(params);
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
export function useGetApiGameRegisteredActiveSuspense<TData = GetApiGameRegisteredActiveQueryResponse, TQueryData = GetApiGameRegisteredActiveQueryResponse, TQueryKey extends QueryKey = GetApiGameRegisteredActiveSuspenseQueryKey>({ headers, params }: {
    headers: GetApiGameRegisteredActiveHeaderParams;
    params?: GetApiGameRegisteredActiveQueryParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameRegisteredActiveQueryResponse, Error, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredActiveSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getApiGameRegisteredActiveSuspenseQueryOptions({ headers, params }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}