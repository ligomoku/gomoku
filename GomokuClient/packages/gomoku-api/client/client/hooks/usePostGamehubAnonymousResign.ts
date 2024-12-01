import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousResignMutationResponse, PostGamehubAnonymousResignQueryParams } from "../../types/PostGamehubAnonymousResign.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousResignMutationKey = () => [{ "url": "/gamehub/anonymous/Resign" }] as const;

 export type PostGamehubAnonymousResignMutationKey = ReturnType<typeof postGamehubAnonymousResignMutationKey>;

 /**
 * {@link /gamehub/anonymous/Resign}
 */
async function postGamehubAnonymousResign({ params }: {
    params?: PostGamehubAnonymousResignQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousResignMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/Resign`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/Resign}
 */
export function usePostGamehubAnonymousResign(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousResignMutationResponse, Error, {
        params?: PostGamehubAnonymousResignQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousResignMutationKey();
    return useMutation<PostGamehubAnonymousResignMutationResponse, Error, {
        params?: PostGamehubAnonymousResignQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousResign({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}