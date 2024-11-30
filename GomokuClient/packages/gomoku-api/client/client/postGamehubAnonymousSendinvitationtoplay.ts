import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousSendinvitationtoplayMutationResponse, PostGamehubAnonymousSendinvitationtoplayQueryParams } from "../models/PostGamehubAnonymousSendinvitationtoplay";

 /**
 * @link /gamehub/anonymous/SendInvitationToPlay
 */
export async function postGamehubAnonymousSendinvitationtoplay(params?: PostGamehubAnonymousSendinvitationtoplayQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousSendinvitationtoplayMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousSendinvitationtoplayMutationResponse>({ method: "post", url: `/gamehub/anonymous/SendInvitationToPlay`, params, ...options });
    return res.data;
}