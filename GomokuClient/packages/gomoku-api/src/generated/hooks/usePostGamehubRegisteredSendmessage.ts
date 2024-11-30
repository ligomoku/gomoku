import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubRegisteredSendmessageMutationResponse, PostGamehubRegisteredSendmessageQueryParams } from "../models/PostGamehubRegisteredSendmessage";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubRegisteredSendmessageClient = typeof client<PostGamehubRegisteredSendmessageMutationResponse, Error, never>;
type PostGamehubRegisteredSendmessage = {
    data: PostGamehubRegisteredSendmessageMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubRegisteredSendmessageQueryParams;
    headerParams: never;
    response: PostGamehubRegisteredSendmessageMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubRegisteredSendmessageClient>[0]>;
        return: Awaited<ReturnType<PostGamehubRegisteredSendmessageClient>>;
    };
};
/**
 * @link /gamehub/registered/SendMessage
 */
export function usePostGamehubRegisteredSendmessage(params?: PostGamehubRegisteredSendmessage["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredSendmessage["response"], PostGamehubRegisteredSendmessage["error"], PostGamehubRegisteredSendmessage["request"]>;
    client?: PostGamehubRegisteredSendmessage["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubRegisteredSendmessage["data"], PostGamehubRegisteredSendmessage["error"], PostGamehubRegisteredSendmessage["request"]>({
                method: "post",
                url: `/gamehub/registered/SendMessage`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}