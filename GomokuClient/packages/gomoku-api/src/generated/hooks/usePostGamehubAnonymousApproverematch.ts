import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type {
  PostGamehubAnonymousApproverematchMutationResponse,
  PostGamehubAnonymousApproverematchQueryParams,
} from "../models/PostGamehubAnonymousApproverematch";
import type { UseMutationOptions } from "@tanstack/react-query";

type PostGamehubAnonymousApproverematchClient = typeof client<
  PostGamehubAnonymousApproverematchMutationResponse,
  Error,
  never
>;
type PostGamehubAnonymousApproverematch = {
  data: PostGamehubAnonymousApproverematchMutationResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: PostGamehubAnonymousApproverematchQueryParams;
  headerParams: never;
  response: PostGamehubAnonymousApproverematchMutationResponse;
  client: {
    parameters: Partial<
      Parameters<PostGamehubAnonymousApproverematchClient>[0]
    >;
    return: Awaited<ReturnType<PostGamehubAnonymousApproverematchClient>>;
  };
};
/**
 * @link /gamehub/anonymous/ApproveRematch
 */
export function usePostGamehubAnonymousApproverematch(
  params?: PostGamehubAnonymousApproverematch["queryParams"],
  options: {
    mutation?: UseMutationOptions<
      PostGamehubAnonymousApproverematch["response"],
      PostGamehubAnonymousApproverematch["error"],
      PostGamehubAnonymousApproverematch["request"]
    >;
    client?: PostGamehubAnonymousApproverematch["client"]["parameters"];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async () => {
      const res = await client<
        PostGamehubAnonymousApproverematch["data"],
        PostGamehubAnonymousApproverematch["error"],
        PostGamehubAnonymousApproverematch["request"]
      >({
        method: "post",
        url: `/gamehub/anonymous/ApproveRematch`,
        params,
        ...clientOptions,
      });
      return res.data;
    },
    ...mutationOptions,
  });
}
