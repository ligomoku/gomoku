import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousRequestrematchMutationResponse, PostGamehubAnonymousRequestrematchQueryParams } from "../models/PostGamehubAnonymousRequestrematch";

 /**
 * @link /gamehub/anonymous/RequestRematch
 */
export async function postGamehubAnonymousRequestrematch(params?: PostGamehubAnonymousRequestrematchQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousRequestrematchMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousRequestrematchMutationResponse>({ method: "post", url: `/gamehub/anonymous/RequestRematch`, params, ...options });
    return res.data;
}