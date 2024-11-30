import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostApiGameRegisteredMutationRequest, PostApiGameRegisteredMutationResponse, PostApiGameRegisteredHeaderParams } from "../models/PostApiGameRegistered";

 /**
 * @link /api/game/registered
 */
export async function postApiGameRegistered(data: PostApiGameRegisteredMutationRequest, headers: PostApiGameRegisteredHeaderParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiGameRegisteredMutationResponse>["data"]> {
    const res = await client<PostApiGameRegisteredMutationResponse, PostApiGameRegisteredMutationRequest>({ method: "post", url: `/api/game/registered`, data, headers: { "Content-Type": "application/*+json", ...headers, ...options.headers }, ...options });
    return res.data;
}