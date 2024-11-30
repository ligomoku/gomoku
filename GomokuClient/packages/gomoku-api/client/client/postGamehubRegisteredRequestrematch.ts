import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredRequestrematchMutationResponse, PostGamehubRegisteredRequestrematchQueryParams } from "../models/PostGamehubRegisteredRequestrematch";

 /**
 * @link /gamehub/registered/RequestRematch
 */
export async function postGamehubRegisteredRequestrematch(params?: PostGamehubRegisteredRequestrematchQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredRequestrematchMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredRequestrematchMutationResponse>({ method: "post", url: `/gamehub/registered/RequestRematch`, params, ...options });
    return res.data;
}