import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { GetHealthQueryResponse, GetHealthHeaderParams } from "../../types/GetHealth.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const getHealthSuspenseQueryKey = () => [{ url: "/health" }] as const;

 export type GetHealthSuspenseQueryKey = ReturnType<typeof getHealthSuspenseQueryKey>;

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

 export function getHealthSuspenseQueryOptions({ headers }: {
    headers?: GetHealthHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const queryKey = getHealthSuspenseQueryKey();
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
export function useGetHealthSuspense<TData = GetHealthQueryResponse, TQueryData = GetHealthQueryResponse, TQueryKey extends QueryKey = GetHealthSuspenseQueryKey>({ headers }: {
    headers?: GetHealthHeaderParams;
}, options: {
    query?: Partial<UseSuspenseQueryOptions<GetHealthQueryResponse, Error, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getHealthSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getHealthSuspenseQueryOptions({ headers }, config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}