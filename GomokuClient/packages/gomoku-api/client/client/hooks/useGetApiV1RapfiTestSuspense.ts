import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetApiV1RapfiTestQueryResponse, GetApiV1RapfiTestHeaderParams, GetApiV1RapfiTest500 } from "../../types/GetApiV1RapfiTest.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getApiV1RapfiTestSuspenseQueryKey = () => [{ url: "/api/v1/rapfi/test" }] as const;

 export type GetApiV1RapfiTestSuspenseQueryKey = ReturnType<typeof getApiV1RapfiTestSuspenseQueryKey>;

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

 export function getApiV1RapfiTestSuspenseQueryOptions({ headers }: {
    headers?: GetApiV1RapfiTestHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getApiV1RapfiTestSuspenseQueryKey();
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
export function useGetApiV1RapfiTestSuspense<TData = GetApiV1RapfiTestQueryResponse, TQueryData = GetApiV1RapfiTestQueryResponse, TQueryKey extends QueryKey = GetApiV1RapfiTestSuspenseQueryKey>({ headers }: {
    headers?: GetApiV1RapfiTestHeaderParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiV1RapfiTestQueryResponse, GetApiV1RapfiTest500, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1RapfiTestSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getApiV1RapfiTestSuspenseQueryOptions({ headers }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiV1RapfiTest500> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}