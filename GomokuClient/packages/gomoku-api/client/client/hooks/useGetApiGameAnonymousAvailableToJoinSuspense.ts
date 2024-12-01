import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiGameAnonymousAvailableToJoinQueryResponse, GetApiGameAnonymousAvailableToJoinQueryParams, GetApiGameAnonymousAvailableToJoinHeaderParams } from "../../types/GetApiGameAnonymousAvailableToJoin.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getApiGameAnonymousAvailableToJoinSuspenseQueryKey = (params?: GetApiGameAnonymousAvailableToJoinQueryParams) => [{ url: "/api/game/anonymous/available-to-join" }, ...(params ? [params] : [])] as const;

 export type GetApiGameAnonymousAvailableToJoinSuspenseQueryKey = ReturnType<typeof getApiGameAnonymousAvailableToJoinSuspenseQueryKey>;

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

 export function getApiGameAnonymousAvailableToJoinSuspenseQueryOptions({ params, headers }: {
    params?: GetApiGameAnonymousAvailableToJoinQueryParams;
    headers?: GetApiGameAnonymousAvailableToJoinHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiGameAnonymousAvailableToJoinSuspenseQueryKey(params);
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
export function useGetApiGameAnonymousAvailableToJoinSuspense<TData = GetApiGameAnonymousAvailableToJoinQueryResponse, TQueryData = GetApiGameAnonymousAvailableToJoinQueryResponse, TQueryKey extends QueryKey = GetApiGameAnonymousAvailableToJoinSuspenseQueryKey>({ params, headers }: {
    params?: GetApiGameAnonymousAvailableToJoinQueryParams;
    headers?: GetApiGameAnonymousAvailableToJoinHeaderParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiGameAnonymousAvailableToJoinQueryResponse, Error, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiGameAnonymousAvailableToJoinSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getApiGameAnonymousAvailableToJoinSuspenseQueryOptions({ params, headers }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}