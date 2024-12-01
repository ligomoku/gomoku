import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousSendinvitationtoplayMutationResponse, PostGamehubAnonymousSendinvitationtoplayQueryParams } from "../../types/PostGamehubAnonymousSendinvitationtoplay.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousSendinvitationtoplayMutationKey = () => [{ "url": "/gamehub/anonymous/SendInvitationToPlay" }] as const;

 export type PostGamehubAnonymousSendinvitationtoplayMutationKey = ReturnType<typeof postGamehubAnonymousSendinvitationtoplayMutationKey>;

 /**
 * {@link /gamehub/anonymous/SendInvitationToPlay}
 */
async function postGamehubAnonymousSendinvitationtoplay({ params }: {
    params?: PostGamehubAnonymousSendinvitationtoplayQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousSendinvitationtoplayMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/SendInvitationToPlay`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/SendInvitationToPlay}
 */
export function usePostGamehubAnonymousSendinvitationtoplay(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousSendinvitationtoplayMutationResponse, Error, {
        params?: PostGamehubAnonymousSendinvitationtoplayQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousSendinvitationtoplayMutationKey();
    return useMutation<PostGamehubAnonymousSendinvitationtoplayMutationResponse, Error, {
        params?: PostGamehubAnonymousSendinvitationtoplayQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousSendinvitationtoplay({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}