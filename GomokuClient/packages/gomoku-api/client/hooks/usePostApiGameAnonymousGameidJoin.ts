import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type { PostApiGameAnonymousGameidJoinMutationRequest, PostApiGameAnonymousGameidJoinMutationResponse, PostApiGameAnonymousGameidJoinPathParams, PostApiGameAnonymousGameidJoinHeaderParams, PostApiGameAnonymousGameidJoin404 } from "../models/PostApiGameAnonymousGameidJoin";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostApiGameAnonymousGameidJoinClient = typeof client<PostApiGameAnonymousGameidJoinMutationResponse, PostApiGameAnonymousGameidJoin404, PostApiGameAnonymousGameidJoinMutationRequest>;
type PostApiGameAnonymousGameidJoin = {
    data: PostApiGameAnonymousGameidJoinMutationResponse;
    error: PostApiGameAnonymousGameidJoin404;
    request: PostApiGameAnonymousGameidJoinMutationRequest;
    pathParams: PostApiGameAnonymousGameidJoinPathParams;
    queryParams: never;
    headerParams: PostApiGameAnonymousGameidJoinHeaderParams;
    response: PostApiGameAnonymousGameidJoinMutationResponse;
    client: {
        parameters: Partial<Parameters<PostApiGameAnonymousGameidJoinClient>[0]>;
        return: Awaited<ReturnType<PostApiGameAnonymousGameidJoinClient>>;
    };
};
/**
 * @summary Join game
 * @link /api/game/anonymous/:gameId/join
 */
export function usePostApiGameAnonymousGameidJoin(gameId: PostApiGameAnonymousGameidJoinPathParams["gameId"], headers?: PostApiGameAnonymousGameidJoin["headerParams"], options: {
    mutation?: UseMutationOptions<PostApiGameAnonymousGameidJoin["response"], PostApiGameAnonymousGameidJoin["error"], PostApiGameAnonymousGameidJoin["request"]>;
    client?: PostApiGameAnonymousGameidJoin["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<PostApiGameAnonymousGameidJoin["data"], PostApiGameAnonymousGameidJoin["error"], PostApiGameAnonymousGameidJoin["request"]>({
                method: "post",
                url: `/api/game/anonymous/${gameId}/join`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}