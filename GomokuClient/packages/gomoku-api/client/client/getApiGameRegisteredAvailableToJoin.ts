import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetApiGameRegisteredAvailableToJoinQueryResponse, GetApiGameRegisteredAvailableToJoinQueryParams, GetApiGameRegisteredAvailableToJoinHeaderParams } from "../models/GetApiGameRegisteredAvailableToJoin";

 /**
 * @link /api/game/registered/available-to-join
 */
export async function getApiGameRegisteredAvailableToJoin(headers: GetApiGameRegisteredAvailableToJoinHeaderParams, params?: GetApiGameRegisteredAvailableToJoinQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiGameRegisteredAvailableToJoinQueryResponse>["data"]> {
    const res = await client<GetApiGameRegisteredAvailableToJoinQueryResponse>({ method: "get", url: `/api/game/registered/available-to-join`, params, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}