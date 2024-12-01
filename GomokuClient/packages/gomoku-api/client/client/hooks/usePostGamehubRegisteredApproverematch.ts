import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredApproverematchMutationResponse, PostGamehubRegisteredApproverematchQueryParams } from "../../types/PostGamehubRegisteredApproverematch.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredApproverematchMutationKey = () => [{ "url": "/gamehub/registered/ApproveRematch" }] as const;

 export type PostGamehubRegisteredApproverematchMutationKey = ReturnType<typeof postGamehubRegisteredApproverematchMutationKey>;

 /**
 * {@link /gamehub/registered/ApproveRematch}
 */
async function postGamehubRegisteredApproverematch({ params }: {
    params?: PostGamehubRegisteredApproverematchQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredApproverematchMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/ApproveRematch`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/ApproveRematch}
 */
export function usePostGamehubRegisteredApproverematch(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredApproverematchMutationResponse, Error, {
        params?: PostGamehubRegisteredApproverematchQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredApproverematchMutationKey();
    return useMutation<PostGamehubRegisteredApproverematchMutationResponse, Error, {
        params?: PostGamehubRegisteredApproverematchQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredApproverematch({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}