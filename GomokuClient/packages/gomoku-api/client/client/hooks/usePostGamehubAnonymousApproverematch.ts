import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousApproverematchMutationResponse, PostGamehubAnonymousApproverematchQueryParams } from "../../types/PostGamehubAnonymousApproverematch.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousApproverematchMutationKey = () => [{ "url": "/gamehub/anonymous/ApproveRematch" }] as const;

 export type PostGamehubAnonymousApproverematchMutationKey = ReturnType<typeof postGamehubAnonymousApproverematchMutationKey>;

 /**
 * {@link /gamehub/anonymous/ApproveRematch}
 */
async function postGamehubAnonymousApproverematch({ params }: {
    params?: PostGamehubAnonymousApproverematchQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousApproverematchMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/ApproveRematch`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/ApproveRematch}
 */
export function usePostGamehubAnonymousApproverematch(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousApproverematchMutationResponse, Error, {
        params?: PostGamehubAnonymousApproverematchQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousApproverematchMutationKey();
    return useMutation<PostGamehubAnonymousApproverematchMutationResponse, Error, {
        params?: PostGamehubAnonymousApproverematchQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousApproverematch({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}