import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostApiGameRegisteredGameidJoinMutationResponse, PostApiGameRegisteredGameidJoinPathParams, PostApiGameRegisteredGameidJoinHeaderParams } from "../models/PostApiGameRegisteredGameidJoin";

 /**
 * @summary Join game
 * @link /api/game/registered/:gameId/join
 */
export async function postApiGameRegisteredGameidJoin(gameId: PostApiGameRegisteredGameidJoinPathParams["gameId"], headers: PostApiGameRegisteredGameidJoinHeaderParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiGameRegisteredGameidJoinMutationResponse>["data"]> {
    const res = await client<PostApiGameRegisteredGameidJoinMutationResponse>({ method: "post", url: `/api/game/registered/${gameId}/join`, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}