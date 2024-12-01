import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousRequestrematchMutationResponse, PostGamehubAnonymousRequestrematchQueryParams } from "../../types/PostGamehubAnonymousRequestrematch.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousRequestrematchMutationKey = () => [{ "url": "/gamehub/anonymous/RequestRematch" }] as const;

 export type PostGamehubAnonymousRequestrematchMutationKey = ReturnType<typeof postGamehubAnonymousRequestrematchMutationKey>;

 /**
 * {@link /gamehub/anonymous/RequestRematch}
 */
async function postGamehubAnonymousRequestrematch({ params }: {
    params?: PostGamehubAnonymousRequestrematchQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousRequestrematchMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/RequestRematch`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/RequestRematch}
 */
export function usePostGamehubAnonymousRequestrematch(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousRequestrematchMutationResponse, Error, {
        params?: PostGamehubAnonymousRequestrematchQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousRequestrematchMutationKey();
    return useMutation<PostGamehubAnonymousRequestrematchMutationResponse, Error, {
        params?: PostGamehubAnonymousRequestrematchQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousRequestrematch({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}