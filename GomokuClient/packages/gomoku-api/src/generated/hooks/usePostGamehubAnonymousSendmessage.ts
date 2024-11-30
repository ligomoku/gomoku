import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubAnonymousSendmessageMutationResponse, PostGamehubAnonymousSendmessageQueryParams } from "../models/PostGamehubAnonymousSendmessage";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubAnonymousSendmessageClient = typeof client<PostGamehubAnonymousSendmessageMutationResponse, Error, never>;
type PostGamehubAnonymousSendmessage = {
    data: PostGamehubAnonymousSendmessageMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubAnonymousSendmessageQueryParams;
    headerParams: never;
    response: PostGamehubAnonymousSendmessageMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubAnonymousSendmessageClient>[0]>;
        return: Awaited<ReturnType<PostGamehubAnonymousSendmessageClient>>;
    };
};
/**
 * @link /gamehub/anonymous/SendMessage
 */
export function usePostGamehubAnonymousSendmessage(params?: PostGamehubAnonymousSendmessage["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubAnonymousSendmessage["response"], PostGamehubAnonymousSendmessage["error"], PostGamehubAnonymousSendmessage["request"]>;
    client?: PostGamehubAnonymousSendmessage["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubAnonymousSendmessage["data"], PostGamehubAnonymousSendmessage["error"], PostGamehubAnonymousSendmessage["request"]>({
                method: "post",
                url: `/gamehub/anonymous/SendMessage`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}