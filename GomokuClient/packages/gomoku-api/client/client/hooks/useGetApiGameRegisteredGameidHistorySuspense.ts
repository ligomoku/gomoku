import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameRegisteredGameidHistoryQueryResponse, GetApiGameRegisteredGameidHistoryPathParams, GetApiGameRegisteredGameidHistoryHeaderParams, GetApiGameRegisteredGameidHistory404 } from "../../types/GetApiGameRegisteredGameidHistory.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getApiGameRegisteredGameidHistorySuspenseQueryKey = ({ gameId }: {
    gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"];
}) => [{ url: "/api/game/registered/:gameId/history", params: { gameId: gameId } }] as const;

 export type GetApiGameRegisteredGameidHistorySuspenseQueryKey = ReturnType<typeof getApiGameRegisteredGameidHistorySuspenseQueryKey>;

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

 export function getApiGameRegisteredGameidHistorySuspenseQueryOptions({ gameId, headers }: {
    gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"];
    headers: GetApiGameRegisteredGameidHistoryHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameRegisteredGameidHistorySuspenseQueryKey({ gameId });
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
export function useGetApiGameRegisteredGameidHistorySuspense<TData = GetApiGameRegisteredGameidHistoryQueryResponse, TQueryData = GetApiGameRegisteredGameidHistoryQueryResponse, TQueryKey extends QueryKey = GetApiGameRegisteredGameidHistorySuspenseQueryKey>({ gameId, headers }: {
    gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"];
    headers: GetApiGameRegisteredGameidHistoryHeaderParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameRegisteredGameidHistoryQueryResponse, GetApiGameRegisteredGameidHistory404, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredGameidHistorySuspenseQueryKey({ gameId });
    const query = useSuspenseQuery({
        ...getApiGameRegisteredGameidHistorySuspenseQueryOptions({ gameId, headers }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiGameRegisteredGameidHistory404> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}