import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameAnonymousActiveQueryResponse, GetApiGameAnonymousActiveQueryParams, GetApiGameAnonymousActiveHeaderParams } from "../../types/GetApiGameAnonymousActive.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getApiGameAnonymousActiveSuspenseQueryKey = (params?: GetApiGameAnonymousActiveQueryParams) => [{ url: "/api/game/anonymous/active" }, ...(params ? [params] : [])] as const;

 export type GetApiGameAnonymousActiveSuspenseQueryKey = ReturnType<typeof getApiGameAnonymousActiveSuspenseQueryKey>;

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

 export function getApiGameAnonymousActiveSuspenseQueryOptions({ params, headers }: {
    params?: GetApiGameAnonymousActiveQueryParams;
    headers?: GetApiGameAnonymousActiveHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameAnonymousActiveSuspenseQueryKey(params);
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
export function useGetApiGameAnonymousActiveSuspense<TData = GetApiGameAnonymousActiveQueryResponse, TQueryData = GetApiGameAnonymousActiveQueryResponse, TQueryKey extends QueryKey = GetApiGameAnonymousActiveSuspenseQueryKey>({ params, headers }: {
    params?: GetApiGameAnonymousActiveQueryParams;
    headers?: GetApiGameAnonymousActiveHeaderParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameAnonymousActiveQueryResponse, Error, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameAnonymousActiveSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getApiGameAnonymousActiveSuspenseQueryOptions({ params, headers }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}