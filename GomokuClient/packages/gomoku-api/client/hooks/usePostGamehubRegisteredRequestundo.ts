import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubRegisteredRequestundoMutationResponse, PostGamehubRegisteredRequestundoQueryParams } from "../models/PostGamehubRegisteredRequestundo";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubRegisteredRequestundoClient = typeof client<PostGamehubRegisteredRequestundoMutationResponse, Error, never>;
type PostGamehubRegisteredRequestundo = {
    data: PostGamehubRegisteredRequestundoMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubRegisteredRequestundoQueryParams;
    headerParams: never;
    response: PostGamehubRegisteredRequestundoMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubRegisteredRequestundoClient>[0]>;
        return: Awaited<ReturnType<PostGamehubRegisteredRequestundoClient>>;
    };
};
/**
 * @link /gamehub/registered/RequestUndo
 */
export function usePostGamehubRegisteredRequestundo(params?: PostGamehubRegisteredRequestundo["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredRequestundo["response"], PostGamehubRegisteredRequestundo["error"], PostGamehubRegisteredRequestundo["request"]>;
    client?: PostGamehubRegisteredRequestundo["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubRegisteredRequestundo["data"], PostGamehubRegisteredRequestundo["error"], PostGamehubRegisteredRequestundo["request"]>({
                method: "post",
                url: `/gamehub/registered/RequestUndo`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}