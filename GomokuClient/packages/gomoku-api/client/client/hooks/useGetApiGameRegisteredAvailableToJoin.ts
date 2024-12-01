import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameRegisteredAvailableToJoinQueryResponse, GetApiGameRegisteredAvailableToJoinQueryParams, GetApiGameRegisteredAvailableToJoinHeaderParams } from "../../types/GetApiGameRegisteredAvailableToJoin.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getApiGameRegisteredAvailableToJoinQueryKey = (params?: GetApiGameRegisteredAvailableToJoinQueryParams) => [{ url: "/api/game/registered/available-to-join" }, ...(params ? [params] : [])] as const;

 export type GetApiGameRegisteredAvailableToJoinQueryKey = ReturnType<typeof getApiGameRegisteredAvailableToJoinQueryKey>;

 /**
 * {@link /api/game/registered/available-to-join}
 */
async function getApiGameRegisteredAvailableToJoin({ headers, params }: {
    headers: GetApiGameRegisteredAvailableToJoinHeaderParams;
    params?: GetApiGameRegisteredAvailableToJoinQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetApiGameRegisteredAvailableToJoinQueryResponse, Error, unknown>({ method: "GET", url: `/api/game/registered/available-to-join`, params, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getApiGameRegisteredAvailableToJoinQueryOptions({ headers, params }: {
    headers: GetApiGameRegisteredAvailableToJoinHeaderParams;
    params?: GetApiGameRegisteredAvailableToJoinQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameRegisteredAvailableToJoinQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getApiGameRegisteredAvailableToJoin({ headers, params }, config);
        },
    });
}

 /**
 * {@link /api/game/registered/available-to-join}
 */
export function useGetApiGameRegisteredAvailableToJoin<TData = GetApiGameRegisteredAvailableToJoinQueryResponse, TQueryData = GetApiGameRegisteredAvailableToJoinQueryResponse, TQueryKey extends QueryKey = GetApiGameRegisteredAvailableToJoinQueryKey>({ headers, params }: {
    headers: GetApiGameRegisteredAvailableToJoinHeaderParams;
    params?: GetApiGameRegisteredAvailableToJoinQueryParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetApiGameRegisteredAvailableToJoinQueryResponse, Error, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredAvailableToJoinQueryKey(params);
    const query = useQuery({
        ...getApiGameRegisteredAvailableToJoinQueryOptions({ headers, params }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}