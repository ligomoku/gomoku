import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameRegisteredAvailableToJoinQueryResponse, GetApiGameRegisteredAvailableToJoinQueryParams, GetApiGameRegisteredAvailableToJoinHeaderParams } from "../../types/GetApiGameRegisteredAvailableToJoin.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getApiGameRegisteredAvailableToJoinSuspenseQueryKey = (params?: GetApiGameRegisteredAvailableToJoinQueryParams) => [{ url: "/api/game/registered/available-to-join" }, ...(params ? [params] : [])] as const;

 export type GetApiGameRegisteredAvailableToJoinSuspenseQueryKey = ReturnType<typeof getApiGameRegisteredAvailableToJoinSuspenseQueryKey>;

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

 export function getApiGameRegisteredAvailableToJoinSuspenseQueryOptions({ headers, params }: {
    headers: GetApiGameRegisteredAvailableToJoinHeaderParams;
    params?: GetApiGameRegisteredAvailableToJoinQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameRegisteredAvailableToJoinSuspenseQueryKey(params);
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
export function useGetApiGameRegisteredAvailableToJoinSuspense<TData = GetApiGameRegisteredAvailableToJoinQueryResponse, TQueryData = GetApiGameRegisteredAvailableToJoinQueryResponse, TQueryKey extends QueryKey = GetApiGameRegisteredAvailableToJoinSuspenseQueryKey>({ headers, params }: {
    headers: GetApiGameRegisteredAvailableToJoinHeaderParams;
    params?: GetApiGameRegisteredAvailableToJoinQueryParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameRegisteredAvailableToJoinQueryResponse, Error, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameRegisteredAvailableToJoinSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getApiGameRegisteredAvailableToJoinSuspenseQueryOptions({ headers, params }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}