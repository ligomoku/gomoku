import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredApproveundoMutationResponse, PostGamehubRegisteredApproveundoQueryParams } from "../../types/PostGamehubRegisteredApproveundo.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredApproveundoMutationKey = () => [{ "url": "/gamehub/registered/ApproveUndo" }] as const;

 export type PostGamehubRegisteredApproveundoMutationKey = ReturnType<typeof postGamehubRegisteredApproveundoMutationKey>;

 /**
 * {@link /gamehub/registered/ApproveUndo}
 */
async function postGamehubRegisteredApproveundo({ params }: {
    params?: PostGamehubRegisteredApproveundoQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredApproveundoMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/ApproveUndo`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/ApproveUndo}
 */
export function usePostGamehubRegisteredApproveundo(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredApproveundoMutationResponse, Error, {
        params?: PostGamehubRegisteredApproveundoQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredApproveundoMutationKey();
    return useMutation<PostGamehubRegisteredApproveundoMutationResponse, Error, {
        params?: PostGamehubRegisteredApproveundoQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredApproveundo({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}