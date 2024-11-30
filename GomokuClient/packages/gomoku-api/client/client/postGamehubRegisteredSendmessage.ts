import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredSendmessageMutationResponse, PostGamehubRegisteredSendmessageQueryParams } from "../models/PostGamehubRegisteredSendmessage";

 /**
 * @link /gamehub/registered/SendMessage
 */
export async function postGamehubRegisteredSendmessage(params?: PostGamehubRegisteredSendmessageQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredSendmessageMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredSendmessageMutationResponse>({ method: "post", url: `/gamehub/registered/SendMessage`, params, ...options });
    return res.data;
}