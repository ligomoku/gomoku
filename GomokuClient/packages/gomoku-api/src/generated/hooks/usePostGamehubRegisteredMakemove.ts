import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubRegisteredMakemoveMutationResponse, PostGamehubRegisteredMakemoveQueryParams } from "../models/PostGamehubRegisteredMakemove";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubRegisteredMakemoveClient = typeof client<PostGamehubRegisteredMakemoveMutationResponse, Error, never>;
type PostGamehubRegisteredMakemove = {
    data: PostGamehubRegisteredMakemoveMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubRegisteredMakemoveQueryParams;
    headerParams: never;
    response: PostGamehubRegisteredMakemoveMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubRegisteredMakemoveClient>[0]>;
        return: Awaited<ReturnType<PostGamehubRegisteredMakemoveClient>>;
    };
};
/**
 * @link /gamehub/registered/MakeMove
 */
export function usePostGamehubRegisteredMakemove(params?: PostGamehubRegisteredMakemove["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredMakemove["response"], PostGamehubRegisteredMakemove["error"], PostGamehubRegisteredMakemove["request"]>;
    client?: PostGamehubRegisteredMakemove["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubRegisteredMakemove["data"], PostGamehubRegisteredMakemove["error"], PostGamehubRegisteredMakemove["request"]>({
                method: "post",
                url: `/gamehub/registered/MakeMove`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}