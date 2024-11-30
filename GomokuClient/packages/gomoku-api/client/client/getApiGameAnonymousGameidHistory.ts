import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetApiGameAnonymousGameidHistoryQueryResponse, GetApiGameAnonymousGameidHistoryPathParams, GetApiGameAnonymousGameidHistoryHeaderParams } from "../models/GetApiGameAnonymousGameidHistory";

 /**
 * @link /api/game/anonymous/:gameId/history
 */
export async function getApiGameAnonymousGameidHistory(gameId: GetApiGameAnonymousGameidHistoryPathParams["gameId"], headers: GetApiGameAnonymousGameidHistoryHeaderParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiGameAnonymousGameidHistoryQueryResponse>["data"]> {
    const res = await client<GetApiGameAnonymousGameidHistoryQueryResponse>({ method: "get", url: `/api/game/anonymous/${gameId}/history`, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}