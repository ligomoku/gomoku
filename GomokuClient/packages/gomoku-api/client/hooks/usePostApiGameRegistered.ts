import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type { PostApiGameRegisteredMutationRequest, PostApiGameRegisteredMutationResponse, PostApiGameRegisteredHeaderParams, PostApiGameRegistered400 } from "../models/PostApiGameRegistered";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostApiGameRegisteredClient = typeof client<PostApiGameRegisteredMutationResponse, PostApiGameRegistered400, PostApiGameRegisteredMutationRequest>;
type PostApiGameRegistered = {
    data: PostApiGameRegisteredMutationResponse;
    error: PostApiGameRegistered400;
    request: PostApiGameRegisteredMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: PostApiGameRegisteredHeaderParams;
    response: PostApiGameRegisteredMutationResponse;
    client: {
        parameters: Partial<Parameters<PostApiGameRegisteredClient>[0]>;
        return: Awaited<ReturnType<PostApiGameRegisteredClient>>;
    };
};
/**
 * @link /api/game/registered
 */
export function usePostApiGameRegistered(headers: PostApiGameRegistered["headerParams"], options: {
    mutation?: UseMutationOptions<PostApiGameRegistered["response"], PostApiGameRegistered["error"], PostApiGameRegistered["request"]>;
    client?: PostApiGameRegistered["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<PostApiGameRegistered["data"], PostApiGameRegistered["error"], PostApiGameRegistered["request"]>({
                method: "post",
                url: `/api/game/registered`,
                data,
                headers: { "Content-Type": "application/*+json", ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}