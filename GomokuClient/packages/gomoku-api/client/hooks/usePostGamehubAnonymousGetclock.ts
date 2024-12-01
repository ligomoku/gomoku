import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubAnonymousGetclockMutationResponse, PostGamehubAnonymousGetclockQueryParams } from "../models/PostGamehubAnonymousGetclock";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubAnonymousGetclockClient = typeof client<PostGamehubAnonymousGetclockMutationResponse, Error, never>;
type PostGamehubAnonymousGetclock = {
    data: PostGamehubAnonymousGetclockMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubAnonymousGetclockQueryParams;
    headerParams: never;
    response: PostGamehubAnonymousGetclockMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubAnonymousGetclockClient>[0]>;
        return: Awaited<ReturnType<PostGamehubAnonymousGetclockClient>>;
    };
};
/**
 * @link /gamehub/anonymous/GetClock
 */
export function usePostGamehubAnonymousGetclock(params?: PostGamehubAnonymousGetclock["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousGetclock["response"], PostGamehubAnonymousGetclock["error"], PostGamehubAnonymousGetclock["request"]>;
    client?: PostGamehubAnonymousGetclock["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubAnonymousGetclock["data"], PostGamehubAnonymousGetclock["error"], PostGamehubAnonymousGetclock["request"]>({
                method: "post",
                url: `/gamehub/anonymous/GetClock`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}