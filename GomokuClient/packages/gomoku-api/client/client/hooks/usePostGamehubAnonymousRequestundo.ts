import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousRequestundoMutationResponse, PostGamehubAnonymousRequestundoQueryParams } from "../../types/PostGamehubAnonymousRequestundo.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousRequestundoMutationKey = () => [{ "url": "/gamehub/anonymous/RequestUndo" }] as const;

 export type PostGamehubAnonymousRequestundoMutationKey = ReturnType<typeof postGamehubAnonymousRequestundoMutationKey>;

 /**
 * {@link /gamehub/anonymous/RequestUndo}
 */
async function postGamehubAnonymousRequestundo({ params }: {
    params?: PostGamehubAnonymousRequestundoQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousRequestundoMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/RequestUndo`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/RequestUndo}
 */
export function usePostGamehubAnonymousRequestundo(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousRequestundoMutationResponse, Error, {
        params?: PostGamehubAnonymousRequestundoQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousRequestundoMutationKey();
    return useMutation<PostGamehubAnonymousRequestundoMutationResponse, Error, {
        params?: PostGamehubAnonymousRequestundoQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousRequestundo({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}