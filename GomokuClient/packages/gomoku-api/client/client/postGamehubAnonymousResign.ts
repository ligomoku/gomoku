import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousResignMutationResponse, PostGamehubAnonymousResignQueryParams } from "../models/PostGamehubAnonymousResign";

 /**
 * @link /gamehub/anonymous/Resign
 */
export async function postGamehubAnonymousResign(params?: PostGamehubAnonymousResignQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousResignMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousResignMutationResponse>({ method: "post", url: `/gamehub/anonymous/Resign`, params, ...options });
    return res.data;
}