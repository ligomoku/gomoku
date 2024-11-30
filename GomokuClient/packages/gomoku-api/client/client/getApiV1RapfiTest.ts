import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetApiV1RapfiTestQueryResponse, GetApiV1RapfiTestHeaderParams } from "../models/GetApiV1RapfiTest";

 /**
 * @summary Test connection with Rapfi engine
 * @link /api/v1/rapfi/test
 */
export async function getApiV1RapfiTest(headers: GetApiV1RapfiTestHeaderParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiV1RapfiTestQueryResponse>["data"]> {
    const res = await client<GetApiV1RapfiTestQueryResponse>({ method: "get", url: `/api/v1/rapfi/test`, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}