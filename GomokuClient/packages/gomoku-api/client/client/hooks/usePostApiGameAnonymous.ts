import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostApiGameAnonymousMutationRequest, PostApiGameAnonymousMutationResponse, PostApiGameAnonymousHeaderParams, PostApiGameAnonymous400 } from "../../types/PostApiGameAnonymous.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postApiGameAnonymousMutationKey = () => [{ "url": "/api/game/anonymous" }] as const;

 export type PostApiGameAnonymousMutationKey = ReturnType<typeof postApiGameAnonymousMutationKey>;

 /**
 * {@link /api/game/anonymous}
 */
async function postApiGameAnonymous({ data, headers }: {
    data: PostApiGameAnonymousMutationRequest;
    headers?: PostApiGameAnonymousHeaderParams;
}, config: Partial<RequestConfig<PostApiGameAnonymousMutationRequest>> = {}) {
    const res = await client<PostApiGameAnonymousMutationResponse, PostApiGameAnonymous400, PostApiGameAnonymousMutationRequest>({ method: "POST", url: `/api/game/anonymous`, data, headers: { ...headers, ...config.headers }, ...config });
    return res.data;
}

 /**
 * {@link /api/game/anonymous}
 */
export function usePostApiGameAnonymous(options: {
    mutation?: UseMutationOptions<PostApiGameAnonymousMutationResponse, PostApiGameAnonymous400, {
        data: PostApiGameAnonymousMutationRequest;
        headers?: PostApiGameAnonymousHeaderParams;
    }>;
    client?: Partial<RequestConfig<PostApiGameAnonymousMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postApiGameAnonymousMutationKey();
    return useMutation<PostApiGameAnonymousMutationResponse, PostApiGameAnonymous400, {
        data: PostApiGameAnonymousMutationRequest;
        headers?: PostApiGameAnonymousHeaderParams;
    }>({
        mutationFn: async ({ data, headers }) => {
            return postApiGameAnonymous({ data, headers }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}