import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameRegisteredGameidHistoryQueryResponse, GetApiGameRegisteredGameidHistoryPathParams, GetApiGameRegisteredGameidHistoryHeaderParams, GetApiGameRegisteredGameidHistory404 } from "../../types/GetApiGameRegisteredGameidHistory.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getApiGameRegisteredGameidHistoryQueryKey = ({ gameId }: {
    gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"];
}) => [{ url: "/api/game/registered/:gameId/history", params: { gameId: gameId } }] as const;

 export type GetApiGameRegisteredGameidHistoryQueryKey = ReturnType<typeof getApiGameRegisteredGameidHistoryQueryKey>;

 /**
 * {@link /api/game/registered/:gameId/history}
 */
async function getApiGameRegisteredGameidHistory({ gameId, headers }: {
    gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"];
    headers: GetApiGameRegisteredGameidHistoryHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetApiGameRegisteredGameidHistoryQueryResponse, GetApiGameRegisteredGameidHistory404, unknown>({ method: "GET", url: `/api/game/registered/${gameId}/history`, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getApiGameRegisteredGameidHistoryQueryOptions({ gameId, headers }: {
    gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"];
    headers: GetApiGameRegisteredGameidHistoryHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameRegisteredGameidHistoryQueryKey({ gameId });
    return queryOptions({
        enabled: !!(gameId),
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getApiGameRegisteredGameidHistory({ gameId, headers }, config);
        },
    });
}

 /**
 * {@link /api/game/registered/:gameId/history}
 */
export function useGetApiGameRegisteredGameidHistory<TData = GetApiGameRegisteredGameidHistoryQueryResponse, TQueryData = GetApiGameRegisteredGameidHistoryQueryResponse, TQueryKey extends QueryKey = GetApiGameRegisteredGameidHistoryQueryKey>({ gameId, headers }: {
    gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"];
    headers: GetApiGameRegisteredGameidHistoryHeaderParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetApiGameRegisteredGameidHistoryQueryResponse, GetApiGameRegisteredGameidHistory404, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredGameidHistoryQueryKey({ gameId });
    const query = useQuery({
        ...getApiGameRegisteredGameidHistoryQueryOptions({ gameId, headers }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiGameRegisteredGameidHistory404> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}