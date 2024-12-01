import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousJoingamegroupMutationResponse, PostGamehubAnonymousJoingamegroupQueryParams } from "../../types/PostGamehubAnonymousJoingamegroup.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousJoingamegroupMutationKey = () => [{ "url": "/gamehub/anonymous/JoinGameGroup" }] as const;

 export type PostGamehubAnonymousJoingamegroupMutationKey = ReturnType<typeof postGamehubAnonymousJoingamegroupMutationKey>;

 /**
 * {@link /gamehub/anonymous/JoinGameGroup}
 */
async function postGamehubAnonymousJoingamegroup({ params }: {
    params?: PostGamehubAnonymousJoingamegroupQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousJoingamegroupMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/JoinGameGroup`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/JoinGameGroup}
 */
export function usePostGamehubAnonymousJoingamegroup(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousJoingamegroupMutationResponse, Error, {
        params?: PostGamehubAnonymousJoingamegroupQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousJoingamegroupMutationKey();
    return useMutation<PostGamehubAnonymousJoingamegroupMutationResponse, Error, {
        params?: PostGamehubAnonymousJoingamegroupQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousJoingamegroup({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}