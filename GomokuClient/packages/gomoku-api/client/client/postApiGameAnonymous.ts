import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostApiGameAnonymousMutationRequest, PostApiGameAnonymousMutationResponse, PostApiGameAnonymousHeaderParams } from "../models/PostApiGameAnonymous";

 /**
 * @link /api/game/anonymous
 */
export async function postApiGameAnonymous(data: PostApiGameAnonymousMutationRequest, headers: PostApiGameAnonymousHeaderParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiGameAnonymousMutationResponse>["data"]> {
    const res = await client<PostApiGameAnonymousMutationResponse, PostApiGameAnonymousMutationRequest>({ method: "post", url: `/api/game/anonymous`, data, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}