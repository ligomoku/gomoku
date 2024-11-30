import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousApproveundoMutationResponse, PostGamehubAnonymousApproveundoQueryParams } from "../models/PostGamehubAnonymousApproveundo";

 /**
 * @link /gamehub/anonymous/ApproveUndo
 */
export async function postGamehubAnonymousApproveundo(params?: PostGamehubAnonymousApproveundoQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousApproveundoMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousApproveundoMutationResponse>({ method: "post", url: `/gamehub/anonymous/ApproveUndo`, params, ...options });
    return res.data;
}