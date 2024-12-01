import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredResignMutationResponse, PostGamehubRegisteredResignQueryParams } from "../../types/PostGamehubRegisteredResign.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredResignMutationKey = () => [{ "url": "/gamehub/registered/Resign" }] as const;

 export type PostGamehubRegisteredResignMutationKey = ReturnType<typeof postGamehubRegisteredResignMutationKey>;

 /**
 * {@link /gamehub/registered/Resign}
 */
async function postGamehubRegisteredResign({ params }: {
    params?: PostGamehubRegisteredResignQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredResignMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/Resign`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/Resign}
 */
export function usePostGamehubRegisteredResign(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredResignMutationResponse, Error, {
        params?: PostGamehubRegisteredResignQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredResignMutationKey();
    return useMutation<PostGamehubRegisteredResignMutationResponse, Error, {
        params?: PostGamehubRegisteredResignQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredResign({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}