import client from "../client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubAnonymousResignMutationResponse, PostGamehubAnonymousResignQueryParams } from "../models/PostGamehubAnonymousResign";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubAnonymousResignClient = typeof client<PostGamehubAnonymousResignMutationResponse, Error, never>;
type PostGamehubAnonymousResign = {
    data: PostGamehubAnonymousResignMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubAnonymousResignQueryParams;
    headerParams: never;
    response: PostGamehubAnonymousResignMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubAnonymousResignClient>[0]>;
        return: Awaited<ReturnType<PostGamehubAnonymousResignClient>>;
    };
};
/**
 * @link /gamehub/anonymous/Resign
 */
export function usePostGamehubAnonymousResign(params?: PostGamehubAnonymousResign["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousResign["response"], PostGamehubAnonymousResign["error"], PostGamehubAnonymousResign["request"]>;
    client?: PostGamehubAnonymousResign["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubAnonymousResign["data"], PostGamehubAnonymousResign["error"], PostGamehubAnonymousResign["request"]>({
                method: "post",
                url: `/gamehub/anonymous/Resign`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}