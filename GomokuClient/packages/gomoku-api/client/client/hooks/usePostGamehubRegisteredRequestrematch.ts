import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredRequestrematchMutationResponse, PostGamehubRegisteredRequestrematchQueryParams } from "../../types/PostGamehubRegisteredRequestrematch.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredRequestrematchMutationKey = () => [{ "url": "/gamehub/registered/RequestRematch" }] as const;

 export type PostGamehubRegisteredRequestrematchMutationKey = ReturnType<typeof postGamehubRegisteredRequestrematchMutationKey>;

 /**
 * {@link /gamehub/registered/RequestRematch}
 */
async function postGamehubRegisteredRequestrematch({ params }: {
    params?: PostGamehubRegisteredRequestrematchQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredRequestrematchMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/RequestRematch`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/RequestRematch}
 */
export function usePostGamehubRegisteredRequestrematch(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredRequestrematchMutationResponse, Error, {
        params?: PostGamehubRegisteredRequestrematchQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredRequestrematchMutationKey();
    return useMutation<PostGamehubRegisteredRequestrematchMutationResponse, Error, {
        params?: PostGamehubRegisteredRequestrematchQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredRequestrematch({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}