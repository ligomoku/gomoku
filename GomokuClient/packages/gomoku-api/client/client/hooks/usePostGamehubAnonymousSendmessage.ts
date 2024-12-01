import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousSendmessageMutationResponse, PostGamehubAnonymousSendmessageQueryParams } from "../../types/PostGamehubAnonymousSendmessage.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousSendmessageMutationKey = () => [{ "url": "/gamehub/anonymous/SendMessage" }] as const;

 export type PostGamehubAnonymousSendmessageMutationKey = ReturnType<typeof postGamehubAnonymousSendmessageMutationKey>;

 /**
 * {@link /gamehub/anonymous/SendMessage}
 */
async function postGamehubAnonymousSendmessage({ params }: {
    params?: PostGamehubAnonymousSendmessageQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousSendmessageMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/SendMessage`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/SendMessage}
 */
export function usePostGamehubAnonymousSendmessage(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousSendmessageMutationResponse, Error, {
        params?: PostGamehubAnonymousSendmessageQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousSendmessageMutationKey();
    return useMutation<PostGamehubAnonymousSendmessageMutationResponse, Error, {
        params?: PostGamehubAnonymousSendmessageQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousSendmessage({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}