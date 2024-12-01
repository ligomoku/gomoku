import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameAnonymousGameidHistoryQueryResponse, GetApiGameAnonymousGameidHistoryPathParams, GetApiGameAnonymousGameidHistoryHeaderParams, GetApiGameAnonymousGameidHistory404 } from "../../types/GetApiGameAnonymousGameidHistory.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getApiGameAnonymousGameidHistorySuspenseQueryKey = ({ gameId }: {
    gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"];
}) => [{ url: "/api/game/anonymous/:gameId/history", params: { gameId: gameId } }] as const;

 export type GetApiGameAnonymousGameidHistorySuspenseQueryKey = ReturnType<typeof getApiGameAnonymousGameidHistorySuspenseQueryKey>;

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

 export function getApiGameAnonymousGameidHistorySuspenseQueryOptions({ gameId, headers }: {
    gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"];
    headers?: GetApiGameAnonymousGameidHistoryHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameAnonymousGameidHistorySuspenseQueryKey({ gameId });
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
export function useGetApiGameAnonymousGameidHistorySuspense<TData = GetApiGameAnonymousGameidHistoryQueryResponse, TQueryData = GetApiGameAnonymousGameidHistoryQueryResponse, TQueryKey extends QueryKey = GetApiGameAnonymousGameidHistorySuspenseQueryKey>({ gameId, headers }: {
    gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"];
    headers?: GetApiGameAnonymousGameidHistoryHeaderParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameAnonymousGameidHistoryQueryResponse, GetApiGameAnonymousGameidHistory404, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameAnonymousGameidHistorySuspenseQueryKey({ gameId });
    const query = useSuspenseQuery({
        ...getApiGameAnonymousGameidHistorySuspenseQueryOptions({ gameId, headers }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiGameAnonymousGameidHistory404> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}