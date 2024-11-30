import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetApiGameAnonymousActiveQueryResponse, GetApiGameAnonymousActiveQueryParams, GetApiGameAnonymousActiveHeaderParams } from "../models/GetApiGameAnonymousActive";

 /**
 * @link /api/game/anonymous/active
 */
export async function getApiGameAnonymousActive(headers: GetApiGameAnonymousActiveHeaderParams, params?: GetApiGameAnonymousActiveQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiGameAnonymousActiveQueryResponse>["data"]> {
    const res = await client<GetApiGameAnonymousActiveQueryResponse>({ method: "get", url: `/api/game/anonymous/active`, params, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}