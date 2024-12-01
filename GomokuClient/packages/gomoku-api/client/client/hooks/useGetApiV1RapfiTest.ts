import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiV1RapfiTestQueryResponse, GetApiV1RapfiTestHeaderParams, GetApiV1RapfiTest500 } from "../../types/GetApiV1RapfiTest.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getApiV1RapfiTestQueryKey = () => [{ url: "/api/v1/rapfi/test" }] as const;

 export type GetApiV1RapfiTestQueryKey = ReturnType<typeof getApiV1RapfiTestQueryKey>;

 /**
 * @summary Test connection with Rapfi engine
 * {@link /api/v1/rapfi/test}
 */
async function getApiV1RapfiTest({ headers }: {
    headers?: GetApiV1RapfiTestHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetApiV1RapfiTestQueryResponse, GetApiV1RapfiTest500, unknown>({ method: "GET", url: `/api/v1/rapfi/test`, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getApiV1RapfiTestQueryOptions({ headers }: {
    headers?: GetApiV1RapfiTestHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiV1RapfiTestQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getApiV1RapfiTest({ headers }, config);
        },
    });
}

 /**
 * @summary Test connection with Rapfi engine
 * {@link /api/v1/rapfi/test}
 */
export function useGetApiV1RapfiTest<TData = GetApiV1RapfiTestQueryResponse, TQueryData = GetApiV1RapfiTestQueryResponse, TQueryKey extends QueryKey = GetApiV1RapfiTestQueryKey>({ headers }: {
    headers?: GetApiV1RapfiTestHeaderParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetApiV1RapfiTestQueryResponse, GetApiV1RapfiTest500, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1RapfiTestQueryKey();
    const query = useQuery({
        ...getApiV1RapfiTestQueryOptions({ headers }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiV1RapfiTest500> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}