import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostApiGameRegisteredGameidJoinMutationResponse, PostApiGameRegisteredGameidJoinPathParams, PostApiGameRegisteredGameidJoinHeaderParams, PostApiGameRegisteredGameidJoin404 } from "../../types/PostApiGameRegisteredGameidJoin.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postApiGameRegisteredGameidJoinMutationKey = () => [{ "url": "/api/game/registered/{gameId}/join" }] as const;

 export type PostApiGameRegisteredGameidJoinMutationKey = ReturnType<typeof postApiGameRegisteredGameidJoinMutationKey>;

 /**
 * @summary Join game
 * {@link /api/game/registered/:gameId/join}
 */
async function postApiGameRegisteredGameidJoin({ gameId, headers }: {
    gameId: PostApiGameRegisteredGameidJoinPathParams["gameId"];
    headers: PostApiGameRegisteredGameidJoinHeaderParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostApiGameRegisteredGameidJoinMutationResponse, PostApiGameRegisteredGameidJoin404, unknown>({ method: "POST", url: `/api/game/registered/${gameId}/join`, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 /**
 * @summary Join game
 * {@link /api/game/registered/:gameId/join}
 */
export function usePostApiGameRegisteredGameidJoin(options: {
    mutation?: UseMutationOptions<PostApiGameRegisteredGameidJoinMutationResponse, PostApiGameRegisteredGameidJoin404, {
        gameId: PostApiGameRegisteredGameidJoinPathParams["gameId"];
        headers: PostApiGameRegisteredGameidJoinHeaderParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postApiGameRegisteredGameidJoinMutationKey();
    return useMutation<PostApiGameRegisteredGameidJoinMutationResponse, PostApiGameRegisteredGameidJoin404, {
        gameId: PostApiGameRegisteredGameidJoinPathParams["gameId"];
        headers: PostApiGameRegisteredGameidJoinHeaderParams;
    }>({
        mutationFn: async ({ gameId, headers }) => {
            return postApiGameRegisteredGameidJoin({ gameId, headers }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}