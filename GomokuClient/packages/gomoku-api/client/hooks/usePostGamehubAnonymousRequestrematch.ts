import client from "../client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubAnonymousRequestrematchMutationResponse, PostGamehubAnonymousRequestrematchQueryParams } from "../models/PostGamehubAnonymousRequestrematch";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubAnonymousRequestrematchClient = typeof client<PostGamehubAnonymousRequestrematchMutationResponse, Error, never>;
type PostGamehubAnonymousRequestrematch = {
    data: PostGamehubAnonymousRequestrematchMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubAnonymousRequestrematchQueryParams;
    headerParams: never;
    response: PostGamehubAnonymousRequestrematchMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubAnonymousRequestrematchClient>[0]>;
        return: Awaited<ReturnType<PostGamehubAnonymousRequestrematchClient>>;
    };
};
/**
 * @link /gamehub/anonymous/RequestRematch
 */
export function usePostGamehubAnonymousRequestrematch(params?: PostGamehubAnonymousRequestrematch["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousRequestrematch["response"], PostGamehubAnonymousRequestrematch["error"], PostGamehubAnonymousRequestrematch["request"]>;
    client?: PostGamehubAnonymousRequestrematch["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubAnonymousRequestrematch["data"], PostGamehubAnonymousRequestrematch["error"], PostGamehubAnonymousRequestrematch["request"]>({
                method: "post",
                url: `/gamehub/anonymous/RequestRematch`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}