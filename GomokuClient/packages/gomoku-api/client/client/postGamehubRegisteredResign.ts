import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredResignMutationResponse, PostGamehubRegisteredResignQueryParams } from "../models/PostGamehubRegisteredResign";

 /**
 * @link /gamehub/registered/Resign
 */
export async function postGamehubRegisteredResign(params?: PostGamehubRegisteredResignQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredResignMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredResignMutationResponse>({ method: "post", url: `/gamehub/registered/Resign`, params, ...options });
    return res.data;
}