import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubRegisteredRequestrematchMutationResponse, PostGamehubRegisteredRequestrematchQueryParams } from "../models/PostGamehubRegisteredRequestrematch";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubRegisteredRequestrematchClient = typeof client<PostGamehubRegisteredRequestrematchMutationResponse, Error, never>;
type PostGamehubRegisteredRequestrematch = {
    data: PostGamehubRegisteredRequestrematchMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubRegisteredRequestrematchQueryParams;
    headerParams: never;
    response: PostGamehubRegisteredRequestrematchMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubRegisteredRequestrematchClient>[0]>;
        return: Awaited<ReturnType<PostGamehubRegisteredRequestrematchClient>>;
    };
};
/**
 * @link /gamehub/registered/RequestRematch
 */
export function usePostGamehubRegisteredRequestrematch(params?: PostGamehubRegisteredRequestrematch["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredRequestrematch["response"], PostGamehubRegisteredRequestrematch["error"], PostGamehubRegisteredRequestrematch["request"]>;
    client?: PostGamehubRegisteredRequestrematch["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubRegisteredRequestrematch["data"], PostGamehubRegisteredRequestrematch["error"], PostGamehubRegisteredRequestrematch["request"]>({
                method: "post",
                url: `/gamehub/registered/RequestRematch`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}