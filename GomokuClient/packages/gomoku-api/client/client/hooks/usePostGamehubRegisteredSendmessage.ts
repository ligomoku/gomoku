import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredSendmessageMutationResponse, PostGamehubRegisteredSendmessageQueryParams } from "../../types/PostGamehubRegisteredSendmessage.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredSendmessageMutationKey = () => [{ "url": "/gamehub/registered/SendMessage" }] as const;

 export type PostGamehubRegisteredSendmessageMutationKey = ReturnType<typeof postGamehubRegisteredSendmessageMutationKey>;

 /**
 * {@link /gamehub/registered/SendMessage}
 */
async function postGamehubRegisteredSendmessage({ params }: {
    params?: PostGamehubRegisteredSendmessageQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredSendmessageMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/SendMessage`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/SendMessage}
 */
export function usePostGamehubRegisteredSendmessage(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredSendmessageMutationResponse, Error, {
        params?: PostGamehubRegisteredSendmessageQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredSendmessageMutationKey();
    return useMutation<PostGamehubRegisteredSendmessageMutationResponse, Error, {
        params?: PostGamehubRegisteredSendmessageQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredSendmessage({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}