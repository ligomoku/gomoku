import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousApproveundoMutationResponse, PostGamehubAnonymousApproveundoQueryParams } from "../../types/PostGamehubAnonymousApproveundo.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousApproveundoMutationKey = () => [{ "url": "/gamehub/anonymous/ApproveUndo" }] as const;

 export type PostGamehubAnonymousApproveundoMutationKey = ReturnType<typeof postGamehubAnonymousApproveundoMutationKey>;

 /**
 * {@link /gamehub/anonymous/ApproveUndo}
 */
async function postGamehubAnonymousApproveundo({ params }: {
    params?: PostGamehubAnonymousApproveundoQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousApproveundoMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/ApproveUndo`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/ApproveUndo}
 */
export function usePostGamehubAnonymousApproveundo(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousApproveundoMutationResponse, Error, {
        params?: PostGamehubAnonymousApproveundoQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousApproveundoMutationKey();
    return useMutation<PostGamehubAnonymousApproveundoMutationResponse, Error, {
        params?: PostGamehubAnonymousApproveundoQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousApproveundo({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}