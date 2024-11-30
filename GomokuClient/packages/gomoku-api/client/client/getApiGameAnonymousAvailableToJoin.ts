import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetApiGameAnonymousAvailableToJoinQueryResponse, GetApiGameAnonymousAvailableToJoinQueryParams, GetApiGameAnonymousAvailableToJoinHeaderParams } from "../models/GetApiGameAnonymousAvailableToJoin";

 /**
 * @link /api/game/anonymous/available-to-join
 */
export async function getApiGameAnonymousAvailableToJoin(headers: GetApiGameAnonymousAvailableToJoinHeaderParams, params?: GetApiGameAnonymousAvailableToJoinQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiGameAnonymousAvailableToJoinQueryResponse>["data"]> {
    const res = await client<GetApiGameAnonymousAvailableToJoinQueryResponse>({ method: "get", url: `/api/game/anonymous/available-to-join`, params, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}