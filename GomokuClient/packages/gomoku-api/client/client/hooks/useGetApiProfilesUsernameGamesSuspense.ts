import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiProfilesUsernameGamesQueryResponse, GetApiProfilesUsernameGamesPathParams, GetApiProfilesUsernameGamesQueryParams, GetApiProfilesUsernameGamesHeaderParams } from "../../types/GetApiProfilesUsernameGames.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getApiProfilesUsernameGamesSuspenseQueryKey = ({ userName }: {
    userName: GetApiProfilesUsernameGamesPathParams["userName"];
}, params?: GetApiProfilesUsernameGamesQueryParams) => [{ url: "/api/profiles/:userName/games", params: { userName: userName } }, ...(params ? [params] : [])] as const;

 export type GetApiProfilesUsernameGamesSuspenseQueryKey = ReturnType<typeof getApiProfilesUsernameGamesSuspenseQueryKey>;

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

 export function getApiProfilesUsernameGamesSuspenseQueryOptions({ userName, params, headers }: {
    userName: GetApiProfilesUsernameGamesPathParams["userName"];
    params?: GetApiProfilesUsernameGamesQueryParams;
    headers?: GetApiProfilesUsernameGamesHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiProfilesUsernameGamesSuspenseQueryKey({ userName }, params);
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
export function useGetApiProfilesUsernameGamesSuspense<TData = GetApiProfilesUsernameGamesQueryResponse, TQueryData = GetApiProfilesUsernameGamesQueryResponse, TQueryKey extends QueryKey = GetApiProfilesUsernameGamesSuspenseQueryKey>({ userName, params, headers }: {
    userName: GetApiProfilesUsernameGamesPathParams["userName"];
    params?: GetApiProfilesUsernameGamesQueryParams;
    headers?: GetApiProfilesUsernameGamesHeaderParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiProfilesUsernameGamesQueryResponse, Error, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiProfilesUsernameGamesSuspenseQueryKey({ userName }, params);
    const query = useSuspenseQuery({
        ...getApiProfilesUsernameGamesSuspenseQueryOptions({ userName, params, headers }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}