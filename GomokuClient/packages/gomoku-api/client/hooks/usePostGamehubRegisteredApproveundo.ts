import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type {
  PostGamehubRegisteredApproveundoMutationResponse,
  PostGamehubRegisteredApproveundoQueryParams,
} from "../models/PostGamehubRegisteredApproveundo";
import type { UseMutationOptions } from "@tanstack/react-query";

type PostGamehubRegisteredApproveundoClient = typeof client<
  PostGamehubRegisteredApproveundoMutationResponse,
  Error,
  never
>;
type PostGamehubRegisteredApproveundo = {
  data: PostGamehubRegisteredApproveundoMutationResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: PostGamehubRegisteredApproveundoQueryParams;
  headerParams: never;
  response: PostGamehubRegisteredApproveundoMutationResponse;
  client: {
    parameters: Partial<Parameters<PostGamehubRegisteredApproveundoClient>[0]>;
    return: Awaited<ReturnType<PostGamehubRegisteredApproveundoClient>>;
  };
};
/**
 * @link /gamehub/registered/ApproveUndo
 */
export function usePostGamehubRegisteredApproveundo(
  params?: PostGamehubRegisteredApproveundo["queryParams"],
  options: {
    mutation?: UseMutationOptions<
      PostGamehubRegisteredApproveundo["response"],
      PostGamehubRegisteredApproveundo["error"],
      PostGamehubRegisteredApproveundo["request"]
    >;
    client?: PostGamehubRegisteredApproveundo["client"]["parameters"];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async () => {
      const res = await client<
        PostGamehubRegisteredApproveundo["data"],
        PostGamehubRegisteredApproveundo["error"],
        PostGamehubRegisteredApproveundo["request"]
      >({
        method: "post",
        url: `/gamehub/registered/ApproveUndo`,
        params,
        ...clientOptions,
      });
      return res.data;
    },
    ...mutationOptions,
  });
}
