import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubRegisteredResignMutationResponse, PostGamehubRegisteredResignQueryParams } from "../models/PostGamehubRegisteredResign";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubRegisteredResignClient = typeof client<PostGamehubRegisteredResignMutationResponse, Error, never>;
type PostGamehubRegisteredResign = {
    data: PostGamehubRegisteredResignMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubRegisteredResignQueryParams;
    headerParams: never;
    response: PostGamehubRegisteredResignMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubRegisteredResignClient>[0]>;
        return: Awaited<ReturnType<PostGamehubRegisteredResignClient>>;
    };
};
/**
 * @link /gamehub/registered/Resign
 */
export function usePostGamehubRegisteredResign(params?: PostGamehubRegisteredResign["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredResign["response"], PostGamehubRegisteredResign["error"], PostGamehubRegisteredResign["request"]>;
    client?: PostGamehubRegisteredResign["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubRegisteredResign["data"], PostGamehubRegisteredResign["error"], PostGamehubRegisteredResign["request"]>({
                method: "post",
                url: `/gamehub/registered/Resign`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}