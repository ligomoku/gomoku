import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type { PostGamehubRegisteredApproverematchMutationResponse, PostGamehubRegisteredApproverematchQueryParams } from "../models/PostGamehubRegisteredApproverematch";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostGamehubRegisteredApproverematchClient = typeof client<PostGamehubRegisteredApproverematchMutationResponse, Error, never>;
type PostGamehubRegisteredApproverematch = {
    data: PostGamehubRegisteredApproverematchMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: PostGamehubRegisteredApproverematchQueryParams;
    headerParams: never;
    response: PostGamehubRegisteredApproverematchMutationResponse;
    client: {
        parameters: Partial<Parameters<PostGamehubRegisteredApproverematchClient>[0]>;
        return: Awaited<ReturnType<PostGamehubRegisteredApproverematchClient>>;
    };
};
/**
 * @link /gamehub/registered/ApproveRematch
 */
export function usePostGamehubRegisteredApproverematch(params?: PostGamehubRegisteredApproverematch["queryParams"], options: {
    mutation?: UseMutationOptions<PostGamehubRegisteredApproverematch["response"], PostGamehubRegisteredApproverematch["error"], PostGamehubRegisteredApproverematch["request"]>;
    client?: PostGamehubRegisteredApproverematch["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PostGamehubRegisteredApproverematch["data"], PostGamehubRegisteredApproverematch["error"], PostGamehubRegisteredApproverematch["request"]>({
                method: "post",
                url: `/gamehub/registered/ApproveRematch`,
                params,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}