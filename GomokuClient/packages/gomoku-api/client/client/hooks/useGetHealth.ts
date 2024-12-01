import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetHealthQueryResponse, GetHealthHeaderParams } from "../../types/GetHealth.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const getHealthQueryKey = () => [{ url: "/health" }] as const;

 export type GetHealthQueryKey = ReturnType<typeof getHealthQueryKey>;

 /**
 * @summary Health check endpoint
 * {@link /health}
 */
async function getHealth({ headers }: {
    headers?: GetHealthHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<GetHealthQueryResponse, Error, unknown>({ method: "GET", url: `/health`, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 export function getHealthQueryOptions({ headers }: {
    headers?: GetHealthHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getHealthQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return getHealth({ headers }, config);
        },
    });
}

 /**
 * @summary Health check endpoint
 * {@link /health}
 */
export function useGetHealth<TData = GetHealthQueryResponse, TQueryData = GetHealthQueryResponse, TQueryKey extends QueryKey = GetHealthQueryKey>({ headers }: {
    headers?: GetHealthHeaderParams;
}, options: {
    query?: Partial<QueryObserverOptions<GetHealthQueryResponse, Error, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getHealthQueryKey();
    const query = useQuery({
        ...getHealthQueryOptions({ headers }, config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}