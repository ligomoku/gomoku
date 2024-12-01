import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubAnonymousMakemoveMutationResponse, PostGamehubAnonymousMakemoveQueryParams } from "../models/PostGamehubAnonymousMakemove";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubAnonymousMakemoveClient = typeof client<PostGamehubAnonymousMakemoveMutationResponse, Error, never>;
type PostGamehubAnonymousMakemove = {
    data: PostGamehubAnonymousMakemoveMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubAnonymousMakemoveQueryParams;
    headerParams: never;
    response: PostGamehubAnonymousMakemoveMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubAnonymousMakemoveClient>[0]>;
        return: Awaited<ReturnType<PostGamehubAnonymousMakemoveClient>>;
    };
};
/**
 * @link /gamehub/anonymous/MakeMove
 */
export function usePostGamehubAnonymousMakemove(params?: PostGamehubAnonymousMakemove["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousMakemove["response"], PostGamehubAnonymousMakemove["error"], PostGamehubAnonymousMakemove["request"]>;
    client?: PostGamehubAnonymousMakemove["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubAnonymousMakemove["data"], PostGamehubAnonymousMakemove["error"], PostGamehubAnonymousMakemove["request"]>({
                method: "post",
                url: `/gamehub/anonymous/MakeMove`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}