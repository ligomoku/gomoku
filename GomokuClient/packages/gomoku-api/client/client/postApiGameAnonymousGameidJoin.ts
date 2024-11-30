import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostApiGameAnonymousGameidJoinMutationRequest, PostApiGameAnonymousGameidJoinMutationResponse, PostApiGameAnonymousGameidJoinPathParams, PostApiGameAnonymousGameidJoinHeaderParams } from "../models/PostApiGameAnonymousGameidJoin";

 /**
 * @summary Join game
 * @link /api/game/anonymous/:gameId/join
 */
export async function postApiGameAnonymousGameidJoin(gameId: PostApiGameAnonymousGameidJoinPathParams["gameId"], data: PostApiGameAnonymousGameidJoinMutationRequest, headers: PostApiGameAnonymousGameidJoinHeaderParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiGameAnonymousGameidJoinMutationResponse>["data"]> {
    const res = await client<PostApiGameAnonymousGameidJoinMutationResponse, PostApiGameAnonymousGameidJoinMutationRequest>({ method: "post", url: `/api/game/anonymous/${gameId}/join`, data, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}