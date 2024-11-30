import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetApiGameRegisteredGameidHistoryQueryResponse, GetApiGameRegisteredGameidHistoryPathParams, GetApiGameRegisteredGameidHistoryHeaderParams } from "../models/GetApiGameRegisteredGameidHistory";

 /**
 * @link /api/game/registered/:gameId/history
 */
export async function getApiGameRegisteredGameidHistory(gameId: GetApiGameRegisteredGameidHistoryPathParams["gameId"], headers: GetApiGameRegisteredGameidHistoryHeaderParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiGameRegisteredGameidHistoryQueryResponse>["data"]> {
    const res = await client<GetApiGameRegisteredGameidHistoryQueryResponse>({ method: "get", url: `/api/game/registered/${gameId}/history`, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}