import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubRegisteredJoingamegroupMutationResponse, PostGamehubRegisteredJoingamegroupQueryParams } from "../models/PostGamehubRegisteredJoingamegroup";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubRegisteredJoingamegroupClient = typeof client<PostGamehubRegisteredJoingamegroupMutationResponse, Error, never>;
type PostGamehubRegisteredJoingamegroup = {
    data: PostGamehubRegisteredJoingamegroupMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubRegisteredJoingamegroupQueryParams;
    headerParams: never;
    response: PostGamehubRegisteredJoingamegroupMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubRegisteredJoingamegroupClient>[0]>;
        return: Awaited<ReturnType<PostGamehubRegisteredJoingamegroupClient>>;
    };
};
/**
 * @link /gamehub/registered/JoinGameGroup
 */
export function usePostGamehubRegisteredJoingamegroup(params?: PostGamehubRegisteredJoingamegroup["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredJoingamegroup["response"], PostGamehubRegisteredJoingamegroup["error"], PostGamehubRegisteredJoingamegroup["request"]>;
    client?: PostGamehubRegisteredJoingamegroup["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubRegisteredJoingamegroup["data"], PostGamehubRegisteredJoingamegroup["error"], PostGamehubRegisteredJoingamegroup["request"]>({
                method: "post",
                url: `/gamehub/registered/JoinGameGroup`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}