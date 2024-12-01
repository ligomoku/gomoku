import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiProfilesUsernameGamesQueryResponse, GetApiProfilesUsernameGamesPathParams, GetApiProfilesUsernameGamesQueryParams, GetApiProfilesUsernameGamesHeaderParams } from "../../types/GetApiProfilesUsernameGames.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getApiProfilesUsernameGamesQueryKey = ({ userName }: {
    userName: GetApiProfilesUsernameGamesPathParams["userName"];
}, params?: GetApiProfilesUsernameGamesQueryParams) => [{ url: "/api/profiles/:userName/games", params: { userName: userName } }, ...(params ? [params] : [])] as const;

 export type GetApiProfilesUsernameGamesQueryKey = ReturnType<typeof getApiProfilesUsernameGamesQueryKey>;

 /**
 * @summary Get games for specific user
 * {@link /api/profiles/:userName/games}
 */
async function getApiProfilesUsernameGames({ userName, params, headers }: {
    userName: GetApiProfilesUsernameGamesPathParams["userName"];
    params?: GetApiProfilesUsernameGamesQueryParams;
    headers?: GetApiProfilesUsernameGamesHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetApiProfilesUsernameGamesQueryResponse, Error, unknown>({ method: "GET", url: `/api/profiles/${userName}/games`, params, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getApiProfilesUsernameGamesQueryOptions({ userName, params, headers }: {
    userName: GetApiProfilesUsernameGamesPathParams["userName"];
    params?: GetApiProfilesUsernameGamesQueryParams;
    headers?: GetApiProfilesUsernameGamesHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiProfilesUsernameGamesQueryKey({ userName }, params);
    return queryOptions({
        enabled: !!(userName),
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getApiProfilesUsernameGames({ userName, params, headers }, config);
        },
    });
}

 /**
 * @summary Get games for specific user
 * {@link /api/profiles/:userName/games}
 */
export function useGetApiProfilesUsernameGames<TData = GetApiProfilesUsernameGamesQueryResponse, TQueryData = GetApiProfilesUsernameGamesQueryResponse, TQueryKey extends QueryKey = GetApiProfilesUsernameGamesQueryKey>({ userName, params, headers }: {
    userName: GetApiProfilesUsernameGamesPathParams["userName"];
    params?: GetApiProfilesUsernameGamesQueryParams;
    headers?: GetApiProfilesUsernameGamesHeaderParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetApiProfilesUsernameGamesQueryResponse, Error, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiProfilesUsernameGamesQueryKey({ userName }, params);
    const query = useQuery({
        ...getApiProfilesUsernameGamesQueryOptions({ userName, params, headers }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}