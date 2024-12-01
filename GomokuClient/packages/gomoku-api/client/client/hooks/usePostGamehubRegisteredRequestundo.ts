import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredRequestundoMutationResponse, PostGamehubRegisteredRequestundoQueryParams } from "../../types/PostGamehubRegisteredRequestundo.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredRequestundoMutationKey = () => [{ "url": "/gamehub/registered/RequestUndo" }] as const;

 export type PostGamehubRegisteredRequestundoMutationKey = ReturnType<typeof postGamehubRegisteredRequestundoMutationKey>;

 /**
 * {@link /gamehub/registered/RequestUndo}
 */
async function postGamehubRegisteredRequestundo({ params }: {
    params?: PostGamehubRegisteredRequestundoQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredRequestundoMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/RequestUndo`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/RequestUndo}
 */
export function usePostGamehubRegisteredRequestundo(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredRequestundoMutationResponse, Error, {
        params?: PostGamehubRegisteredRequestundoQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredRequestundoMutationKey();
    return useMutation<PostGamehubRegisteredRequestundoMutationResponse, Error, {
        params?: PostGamehubRegisteredRequestundoQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredRequestundo({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}