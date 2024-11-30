import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredSendinvitationtoplayMutationResponse, PostGamehubRegisteredSendinvitationtoplayQueryParams } from "../models/PostGamehubRegisteredSendinvitationtoplay";

 /**
 * @link /gamehub/registered/SendInvitationToPlay
 */
export async function postGamehubRegisteredSendinvitationtoplay(params?: PostGamehubRegisteredSendinvitationtoplayQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredSendinvitationtoplayMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredSendinvitationtoplayMutationResponse>({ method: "post", url: `/gamehub/registered/SendInvitationToPlay`, params, ...options });
    return res.data;
}