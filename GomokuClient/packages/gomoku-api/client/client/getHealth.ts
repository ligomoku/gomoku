import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetHealthQueryResponse, GetHealthHeaderParams } from "../models/GetHealth";

 /**
 * @summary Health check endpoint
 * @link /health
 */
export async function getHealth(headers: GetHealthHeaderParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetHealthQueryResponse>["data"]> {
    const res = await client<GetHealthQueryResponse>({ method: "get", url: `/health`, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}