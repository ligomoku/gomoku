import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredJoingamegroupMutationResponse, PostGamehubRegisteredJoingamegroupQueryParams } from "../../types/PostGamehubRegisteredJoingamegroup.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredJoingamegroupMutationKey = () => [{ "url": "/gamehub/registered/JoinGameGroup" }] as const;

 export type PostGamehubRegisteredJoingamegroupMutationKey = ReturnType<typeof postGamehubRegisteredJoingamegroupMutationKey>;

 /**
 * {@link /gamehub/registered/JoinGameGroup}
 */
async function postGamehubRegisteredJoingamegroup({ params }: {
    params?: PostGamehubRegisteredJoingamegroupQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredJoingamegroupMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/JoinGameGroup`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/JoinGameGroup}
 */
export function usePostGamehubRegisteredJoingamegroup(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredJoingamegroupMutationResponse, Error, {
        params?: PostGamehubRegisteredJoingamegroupQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredJoingamegroupMutationKey();
    return useMutation<PostGamehubRegisteredJoingamegroupMutationResponse, Error, {
        params?: PostGamehubRegisteredJoingamegroupQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredJoingamegroup({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}