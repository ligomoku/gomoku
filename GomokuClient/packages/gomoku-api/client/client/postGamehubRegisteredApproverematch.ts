import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredApproverematchMutationResponse, PostGamehubRegisteredApproverematchQueryParams } from "../models/PostGamehubRegisteredApproverematch";

 /**
 * @link /gamehub/registered/ApproveRematch
 */
export async function postGamehubRegisteredApproverematch(params?: PostGamehubRegisteredApproverematchQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredApproverematchMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredApproverematchMutationResponse>({ method: "post", url: `/gamehub/registered/ApproveRematch`, params, ...options });
    return res.data;
}