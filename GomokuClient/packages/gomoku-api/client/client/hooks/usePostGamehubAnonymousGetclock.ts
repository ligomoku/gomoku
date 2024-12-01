import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubAnonymousGetclockMutationResponse, PostGamehubAnonymousGetclockQueryParams } from "../../types/PostGamehubAnonymousGetclock.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubAnonymousGetclockMutationKey = () => [{ "url": "/gamehub/anonymous/GetClock" }] as const;

 export type PostGamehubAnonymousGetclockMutationKey = ReturnType<typeof postGamehubAnonymousGetclockMutationKey>;

 /**
 * {@link /gamehub/anonymous/GetClock}
 */
async function postGamehubAnonymousGetclock({ params }: {
    params?: PostGamehubAnonymousGetclockQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubAnonymousGetclockMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/anonymous/GetClock`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/anonymous/GetClock}
 */
export function usePostGamehubAnonymousGetclock(options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousGetclockMutationResponse, Error, {
        params?: PostGamehubAnonymousGetclockQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubAnonymousGetclockMutationKey();
    return useMutation<PostGamehubAnonymousGetclockMutationResponse, Error, {
        params?: PostGamehubAnonymousGetclockQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubAnonymousGetclock({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}