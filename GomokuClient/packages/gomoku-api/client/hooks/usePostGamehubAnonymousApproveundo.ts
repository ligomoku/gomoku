import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type {
  PostGamehubAnonymousApproveundoMutationResponse,
  PostGamehubAnonymousApproveundoQueryParams,
} from "../models/PostGamehubAnonymousApproveundo";
import type { UseMutationOptions } from "@tanstack/react-query";

type PostGamehubAnonymousApproveundoClient = typeof client<
  PostGamehubAnonymousApproveundoMutationResponse,
  Error,
  never
>;
type PostGamehubAnonymousApproveundo = {
  data: PostGamehubAnonymousApproveundoMutationResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: PostGamehubAnonymousApproveundoQueryParams;
  headerParams: never;
  response: PostGamehubAnonymousApproveundoMutationResponse;
  client: {
    parameters: Partial<Parameters<PostGamehubAnonymousApproveundoClient>[0]>;
    return: Awaited<ReturnType<PostGamehubAnonymousApproveundoClient>>;
  };
};
/**
 * @link /gamehub/anonymous/ApproveUndo
 */
export function usePostGamehubAnonymousApproveundo(
  params?: PostGamehubAnonymousApproveundo["queryParams"],
  options: {
    mutation?: UseMutationOptions<
      PostGamehubAnonymousApproveundo["response"],
      PostGamehubAnonymousApproveundo["error"],
      PostGamehubAnonymousApproveundo["request"]
    >;
    client?: PostGamehubAnonymousApproveundo["client"]["parameters"];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async () => {
      const res = await client<
        PostGamehubAnonymousApproveundo["data"],
        PostGamehubAnonymousApproveundo["error"],
        PostGamehubAnonymousApproveundo["request"]
      >({
        method: "post",
        url: `/gamehub/anonymous/ApproveUndo`,
        params,
        ...clientOptions,
      });
      return res.data;
    },
    ...mutationOptions,
  });
}
