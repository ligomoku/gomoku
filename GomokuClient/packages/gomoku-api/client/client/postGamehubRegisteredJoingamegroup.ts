import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredJoingamegroupMutationResponse, PostGamehubRegisteredJoingamegroupQueryParams } from "../models/PostGamehubRegisteredJoingamegroup";

 /**
 * @link /gamehub/registered/JoinGameGroup
 */
export async function postGamehubRegisteredJoingamegroup(params?: PostGamehubRegisteredJoingamegroupQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredJoingamegroupMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredJoingamegroupMutationResponse>({ method: "post", url: `/gamehub/registered/JoinGameGroup`, params, ...options });
    return res.data;
}