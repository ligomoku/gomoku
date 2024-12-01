import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameAnonymousAvailableToJoinQueryResponse, GetApiGameAnonymousAvailableToJoinQueryParams, GetApiGameAnonymousAvailableToJoinHeaderParams } from "../../types/GetApiGameAnonymousAvailableToJoin.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getApiGameAnonymousAvailableToJoinQueryKey = (params?: GetApiGameAnonymousAvailableToJoinQueryParams) => [{ url: "/api/game/anonymous/available-to-join" }, ...(params ? [params] : [])] as const;

 export type GetApiGameAnonymousAvailableToJoinQueryKey = ReturnType<typeof getApiGameAnonymousAvailableToJoinQueryKey>;

 /**
 * {@link /api/game/anonymous/available-to-join}
 */
async function getApiGameAnonymousAvailableToJoin({ params, headers }: {
    params?: GetApiGameAnonymousAvailableToJoinQueryParams;
    headers?: GetApiGameAnonymousAvailableToJoinHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetApiGameAnonymousAvailableToJoinQueryResponse, Error, unknown>({ method: "GET", url: `/api/game/anonymous/available-to-join`, params, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getApiGameAnonymousAvailableToJoinQueryOptions({ params, headers }: {
    params?: GetApiGameAnonymousAvailableToJoinQueryParams;
    headers?: GetApiGameAnonymousAvailableToJoinHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameAnonymousAvailableToJoinQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getApiGameAnonymousAvailableToJoin({ params, headers }, config);
        },
    });
}

 /**
 * {@link /api/game/anonymous/available-to-join}
 */
export function useGetApiGameAnonymousAvailableToJoin<TData = GetApiGameAnonymousAvailableToJoinQueryResponse, TQueryData = GetApiGameAnonymousAvailableToJoinQueryResponse, TQueryKey extends QueryKey = GetApiGameAnonymousAvailableToJoinQueryKey>({ params, headers }: {
    params?: GetApiGameAnonymousAvailableToJoinQueryParams;
    headers?: GetApiGameAnonymousAvailableToJoinHeaderParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetApiGameAnonymousAvailableToJoinQueryResponse, Error, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameAnonymousAvailableToJoinQueryKey(params);
    const query = useQuery({
        ...getApiGameAnonymousAvailableToJoinQueryOptions({ params, headers }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}