import client from "../../../http.ts";
import type { RequestConfig } from "../../../http.ts";
import type { PostGamehubRegisteredGetclockMutationResponse, PostGamehubRegisteredGetclockQueryParams } from "../../types/PostGamehubRegisteredGetclock.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 export const postGamehubRegisteredGetclockMutationKey = () => [{ "url": "/gamehub/registered/GetClock" }] as const;

 export type PostGamehubRegisteredGetclockMutationKey = ReturnType<typeof postGamehubRegisteredGetclockMutationKey>;

 /**
 * {@link /gamehub/registered/GetClock}
 */
async function postGamehubRegisteredGetclock({ params }: {
    params?: PostGamehubRegisteredGetclockQueryParams;
}, config: Partial<RequestConfig> = {}) {
    const res = await client<PostGamehubRegisteredGetclockMutationResponse, Error, unknown>({ method: "POST", url: `/gamehub/registered/GetClock`, params, ...config });
    return res.data;
}

 /**
 * {@link /gamehub/registered/GetClock}
 */
export function usePostGamehubRegisteredGetclock(options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredGetclockMutationResponse, Error, {
        params?: PostGamehubRegisteredGetclockQueryParams;
    }>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? postGamehubRegisteredGetclockMutationKey();
    return useMutation<PostGamehubRegisteredGetclockMutationResponse, Error, {
        params?: PostGamehubRegisteredGetclockQueryParams;
    }>({
        mutationFn: async ({ params }) => {
            return postGamehubRegisteredGetclock({ params }, config);
        },
        mutationKey,
        ...mutationOptions
    });
}