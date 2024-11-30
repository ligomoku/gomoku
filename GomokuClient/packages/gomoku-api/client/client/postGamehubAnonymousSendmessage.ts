import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousSendmessageMutationResponse, PostGamehubAnonymousSendmessageQueryParams } from "../models/PostGamehubAnonymousSendmessage";

 /**
 * @link /gamehub/anonymous/SendMessage
 */
export async function postGamehubAnonymousSendmessage(params?: PostGamehubAnonymousSendmessageQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousSendmessageMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousSendmessageMutationResponse>({ method: "post", url: `/gamehub/anonymous/SendMessage`, params, ...options });
    return res.data;
}