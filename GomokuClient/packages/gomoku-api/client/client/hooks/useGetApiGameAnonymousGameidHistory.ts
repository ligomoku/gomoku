import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameAnonymousGameidHistoryQueryResponse, GetApiGameAnonymousGameidHistoryPathParams, GetApiGameAnonymousGameidHistoryHeaderParams, GetApiGameAnonymousGameidHistory404 } from "../../types/GetApiGameAnonymousGameidHistory.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getApiGameAnonymousGameidHistoryQueryKey = ({ gameId }: {
    gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"];
}) => [{ url: "/api/game/anonymous/:gameId/history", params: { gameId: gameId } }] as const;

 export type GetApiGameAnonymousGameidHistoryQueryKey = ReturnType<typeof getApiGameAnonymousGameidHistoryQueryKey>;

 /**
 * {@link /api/game/anonymous/:gameId/history}
 */
async function getApiGameAnonymousGameidHistory({ gameId, headers }: {
    gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"];
    headers?: GetApiGameAnonymousGameidHistoryHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetApiGameAnonymousGameidHistoryQueryResponse, GetApiGameAnonymousGameidHistory404, unknown>({ method: "GET", url: `/api/game/anonymous/${gameId}/history`, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getApiGameAnonymousGameidHistoryQueryOptions({ gameId, headers }: {
    gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"];
    headers?: GetApiGameAnonymousGameidHistoryHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameAnonymousGameidHistoryQueryKey({ gameId });
    return queryOptions({
        enabled: !!(gameId),
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getApiGameAnonymousGameidHistory({ gameId, headers }, config);
        },
    });
}

 /**
 * {@link /api/game/anonymous/:gameId/history}
 */
export function useGetApiGameAnonymousGameidHistory<TData = GetApiGameAnonymousGameidHistoryQueryResponse, TQueryData = GetApiGameAnonymousGameidHistoryQueryResponse, TQueryKey extends QueryKey = GetApiGameAnonymousGameidHistoryQueryKey>({ gameId, headers }: {
    gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"];
    headers?: GetApiGameAnonymousGameidHistoryHeaderParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetApiGameAnonymousGameidHistoryQueryResponse, GetApiGameAnonymousGameidHistory404, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameAnonymousGameidHistoryQueryKey({ gameId });
    const query = useQuery({
        ...getApiGameAnonymousGameidHistoryQueryOptions({ gameId, headers }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiGameAnonymousGameidHistory404> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}