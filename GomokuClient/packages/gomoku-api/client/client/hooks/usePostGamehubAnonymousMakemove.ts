import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousMakemoveMutationResponse, PostGamehubAnonymousMakemoveQueryParams } from "../../types/PostGamehubAnonymousMakemove.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousMakemoveMutationKey = () => [{ "url": "/gamehub/anonymous/MakeMove" }] as const;

 export type PostGamehubAnonymousMakemoveMutationKey = ReturnType<typeof postGamehubAnonymousMakemoveMutationKey>;

 /**
 * {@link /gamehub/anonymous/MakeMove}
 */
async function postGamehubAnonymousMakemove({ params }: {
    params?: PostGamehubAnonymousMakemoveQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousMakemoveMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/MakeMove`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/MakeMove}
 */
export function usePostGamehubAnonymousMakemove(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousMakemoveMutationResponse, Error, {
        params?: PostGamehubAnonymousMakemoveQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousMakemoveMutationKey();
    return useMutation<PostGamehubAnonymousMakemoveMutationResponse, Error, {
        params?: PostGamehubAnonymousMakemoveQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousMakemove({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}