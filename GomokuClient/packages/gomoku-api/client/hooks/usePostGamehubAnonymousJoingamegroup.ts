import client from "../client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubAnonymousJoingamegroupMutationResponse, PostGamehubAnonymousJoingamegroupQueryParams } from "../models/PostGamehubAnonymousJoingamegroup";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubAnonymousJoingamegroupClient = typeof client<PostGamehubAnonymousJoingamegroupMutationResponse, Error, never>;
type PostGamehubAnonymousJoingamegroup = {
    data: PostGamehubAnonymousJoingamegroupMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubAnonymousJoingamegroupQueryParams;
    headerParams: never;
    response: PostGamehubAnonymousJoingamegroupMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubAnonymousJoingamegroupClient>[0]>;
        return: Awaited<ReturnType<PostGamehubAnonymousJoingamegroupClient>>;
    };
};
/**
 * @link /gamehub/anonymous/JoinGameGroup
 */
export function usePostGamehubAnonymousJoingamegroup(params?: PostGamehubAnonymousJoingamegroup["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousJoingamegroup["response"], PostGamehubAnonymousJoingamegroup["error"], PostGamehubAnonymousJoingamegroup["request"]>;
    client?: PostGamehubAnonymousJoingamegroup["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubAnonymousJoingamegroup["data"], PostGamehubAnonymousJoingamegroup["error"], PostGamehubAnonymousJoingamegroup["request"]>({
                method: "post",
                url: `/gamehub/anonymous/JoinGameGroup`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}