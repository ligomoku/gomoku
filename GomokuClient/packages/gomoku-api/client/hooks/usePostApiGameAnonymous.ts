import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type { PostApiGameAnonymousMutationRequest, PostApiGameAnonymousMutationResponse, PostApiGameAnonymousHeaderParams, PostApiGameAnonymous400 } from "../models/PostApiGameAnonymous";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostApiGameAnonymousClient = typeof client<PostApiGameAnonymousMutationResponse, PostApiGameAnonymous400, PostApiGameAnonymousMutationRequest>;
type PostApiGameAnonymous = {
    data: PostApiGameAnonymousMutationResponse;
    error: PostApiGameAnonymous400;
    request: PostApiGameAnonymousMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: PostApiGameAnonymousHeaderParams;
    response: PostApiGameAnonymousMutationResponse;
    client: {
        parameters: Partial<Parameters<PostApiGameAnonymousClient>[0]>;
        return: Awaited<ReturnType<PostApiGameAnonymousClient>>;
    };
};
/**
 * @link /api/game/anonymous
 */
export function usePostApiGameAnonymous(headers: PostApiGameAnonymous["headerParams"], options: {
    mutation?: UseMutationOptions<PostApiGameAnonymous["response"], PostApiGameAnonymous["error"], PostApiGameAnonymous["request"]>;
    client?: PostApiGameAnonymous["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<PostApiGameAnonymous["data"], PostApiGameAnonymous["error"], PostApiGameAnonymous["request"]>({
                method: "post",
                url: `/api/game/anonymous`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}