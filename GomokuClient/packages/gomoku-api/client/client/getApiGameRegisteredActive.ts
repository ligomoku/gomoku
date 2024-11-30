import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetApiGameRegisteredActiveQueryResponse, GetApiGameRegisteredActiveQueryParams, GetApiGameRegisteredActiveHeaderParams } from "../models/GetApiGameRegisteredActive";

 /**
 * @link /api/game/registered/active
 */
export async function getApiGameRegisteredActive(headers: GetApiGameRegisteredActiveHeaderParams, params?: GetApiGameRegisteredActiveQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiGameRegisteredActiveQueryResponse>["data"]> {
    const res = await client<GetApiGameRegisteredActiveQueryResponse>({ method: "get", url: `/api/game/registered/active`, params, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}