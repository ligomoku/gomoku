import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostApiGameRegisteredMutationRequest, PostApiGameRegisteredMutationResponse, PostApiGameRegisteredHeaderParams, PostApiGameRegistered400 } from "../../types/PostApiGameRegistered.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postApiGameRegisteredMutationKey = () => [{ "url": "/api/game/registered" }] as const;

 export type PostApiGameRegisteredMutationKey = ReturnType<typeof postApiGameRegisteredMutationKey>;

 /**
 * {@link /api/game/registered}
 */
async function postApiGameRegistered({ data, headers }: {
    data: PostApiGameRegisteredMutationRequest;
    headers: PostApiGameRegisteredHeaderParams;
}, config: Partial<RequestConfig<PostApiGameRegisteredMutationRequest>> = {}) {
    const res = await client<PostApiGameRegisteredMutationResponse, PostApiGameRegistered400, PostApiGameRegisteredMutationRequest>({ method: "POST", url: `/api/game/registered`, data, headers: { "Content-Type": "application/*+json", ...headers, ...config.headers }, ...config });
    return res.data;
}

 /**
 * {@link /api/game/registered}
 */
export function usePostApiGameRegistered(options: {
    mutation?: UseMutationOptions<PostApiGameRegisteredMutationResponse, PostApiGameRegistered400, {
        data: PostApiGameRegisteredMutationRequest;
        headers: PostApiGameRegisteredHeaderParams;
    }>;
    client?: Partial<RequestConfig<PostApiGameRegisteredMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postApiGameRegisteredMutationKey();
    return useMutation<PostApiGameRegisteredMutationResponse, PostApiGameRegistered400, {
        data: PostApiGameRegisteredMutationRequest;
        headers: PostApiGameRegisteredHeaderParams;
    }>({
        mutationFn: async ({ data, headers }) => {
            return postApiGameRegistered({ data, headers }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}