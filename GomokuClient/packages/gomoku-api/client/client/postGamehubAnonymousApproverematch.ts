import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousApproverematchMutationResponse, PostGamehubAnonymousApproverematchQueryParams } from "../models/PostGamehubAnonymousApproverematch";

 /**
 * @link /gamehub/anonymous/ApproveRematch
 */
export async function postGamehubAnonymousApproverematch(params?: PostGamehubAnonymousApproverematchQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousApproverematchMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousApproverematchMutationResponse>({ method: "post", url: `/gamehub/anonymous/ApproveRematch`, params, ...options });
    return res.data;
}