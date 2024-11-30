import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredApproveundoMutationResponse, PostGamehubRegisteredApproveundoQueryParams } from "../models/PostGamehubRegisteredApproveundo";

 /**
 * @link /gamehub/registered/ApproveUndo
 */
export async function postGamehubRegisteredApproveundo(params?: PostGamehubRegisteredApproveundoQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredApproveundoMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredApproveundoMutationResponse>({ method: "post", url: `/gamehub/registered/ApproveUndo`, params, ...options });
    return res.data;
}