import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousJoingamegroupMutationResponse, PostGamehubAnonymousJoingamegroupQueryParams } from "../models/PostGamehubAnonymousJoingamegroup";

 /**
 * @link /gamehub/anonymous/JoinGameGroup
 */
export async function postGamehubAnonymousJoingamegroup(params?: PostGamehubAnonymousJoingamegroupQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousJoingamegroupMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousJoingamegroupMutationResponse>({ method: "post", url: `/gamehub/anonymous/JoinGameGroup`, params, ...options });
    return res.data;
}