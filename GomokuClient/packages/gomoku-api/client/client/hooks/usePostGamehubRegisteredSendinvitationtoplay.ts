import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredSendinvitationtoplayMutationResponse, PostGamehubRegisteredSendinvitationtoplayQueryParams } from "../../types/PostGamehubRegisteredSendinvitationtoplay.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredSendinvitationtoplayMutationKey = () => [{ "url": "/gamehub/registered/SendInvitationToPlay" }] as const;

 export type PostGamehubRegisteredSendinvitationtoplayMutationKey = ReturnType<typeof postGamehubRegisteredSendinvitationtoplayMutationKey>;

 /**
 * {@link /gamehub/registered/SendInvitationToPlay}
 */
async function postGamehubRegisteredSendinvitationtoplay({ params }: {
    params?: PostGamehubRegisteredSendinvitationtoplayQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredSendinvitationtoplayMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/SendInvitationToPlay`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/SendInvitationToPlay}
 */
export function usePostGamehubRegisteredSendinvitationtoplay(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredSendinvitationtoplayMutationResponse, Error, {
        params?: PostGamehubRegisteredSendinvitationtoplayQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredSendinvitationtoplayMutationKey();
    return useMutation<PostGamehubRegisteredSendinvitationtoplayMutationResponse, Error, {
        params?: PostGamehubRegisteredSendinvitationtoplayQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredSendinvitationtoplay({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}