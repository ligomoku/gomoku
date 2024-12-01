import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostApiGameAnonymousGameidJoinMutationRequest, PostApiGameAnonymousGameidJoinMutationResponse, PostApiGameAnonymousGameidJoinPathParams, PostApiGameAnonymousGameidJoinHeaderParams, PostApiGameAnonymousGameidJoin404 } from "../../types/PostApiGameAnonymousGameidJoin.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postApiGameAnonymousGameidJoinMutationKey = () => [{ "url": "/api/game/anonymous/{gameId}/join" }] as const;

 export type PostApiGameAnonymousGameidJoinMutationKey = ReturnType<typeof postApiGameAnonymousGameidJoinMutationKey>;

 /**
 * @summary Join game
 * {@link /api/game/anonymous/:gameId/join}
 */
async function postApiGameAnonymousGameidJoin({ gameId, data, headers }: {
    gameId: PostApiGameAnonymousGameidJoinPathParams["gameId"];
    data: PostApiGameAnonymousGameidJoinMutationRequest;
    headers?: PostApiGameAnonymousGameidJoinHeaderParams;
}, config: Partial<RequestConfig<PostApiGameAnonymousGameidJoinMutationRequest>> = {}) {
    const res = await client<PostApiGameAnonymousGameidJoinMutationResponse, PostApiGameAnonymousGameidJoin404, PostApiGameAnonymousGameidJoinMutationRequest>({ method: "POST", url: `/api/game/anonymous/${gameId}/join`, data, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 /**
 * @summary Join game
 * {@link /api/game/anonymous/:gameId/join}
 */
export function usePostApiGameAnonymousGameidJoin(options: {
    mutation?: UseMutationOptions<PostApiGameAnonymousGameidJoinMutationResponse, PostApiGameAnonymousGameidJoin404, {
        gameId: PostApiGameAnonymousGameidJoinPathParams["gameId"];
        data: PostApiGameAnonymousGameidJoinMutationRequest;
        headers?: PostApiGameAnonymousGameidJoinHeaderParams;
    }>;
    client?: Partial<RequestConfig<PostApiGameAnonymousGameidJoinMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postApiGameAnonymousGameidJoinMutationKey();
    return useMutation<PostApiGameAnonymousGameidJoinMutationResponse, PostApiGameAnonymousGameidJoin404, {
        gameId: PostApiGameAnonymousGameidJoinPathParams["gameId"];
        data: PostApiGameAnonymousGameidJoinMutationRequest;
        headers?: PostApiGameAnonymousGameidJoinHeaderParams;
    }>({
        mutationFn: async ({ gameId, data, headers }) => {
            return postApiGameAnonymousGameidJoin({ gameId, data, headers }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}