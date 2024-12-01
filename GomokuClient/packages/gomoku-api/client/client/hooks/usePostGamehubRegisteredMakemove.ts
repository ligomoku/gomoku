import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredMakemoveMutationResponse, PostGamehubRegisteredMakemoveQueryParams } from "../../types/PostGamehubRegisteredMakemove.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredMakemoveMutationKey = () => [{ "url": "/gamehub/registered/MakeMove" }] as const;

 export type PostGamehubRegisteredMakemoveMutationKey = ReturnType<typeof postGamehubRegisteredMakemoveMutationKey>;

 /**
 * {@link /gamehub/registered/MakeMove}
 */
async function postGamehubRegisteredMakemove({ params }: {
    params?: PostGamehubRegisteredMakemoveQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredMakemoveMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/MakeMove`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/MakeMove}
 */
export function usePostGamehubRegisteredMakemove(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredMakemoveMutationResponse, Error, {
        params?: PostGamehubRegisteredMakemoveQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredMakemoveMutationKey();
    return useMutation<PostGamehubRegisteredMakemoveMutationResponse, Error, {
        params?: PostGamehubRegisteredMakemoveQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredMakemove({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}