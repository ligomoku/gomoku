import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type {
  PostGamehubAnonymousRequestundoMutationResponse,
  PostGamehubAnonymousRequestundoQueryParams,
} from "../models/PostGamehubAnonymousRequestundo";
import type { UseMutationOptions } from "@tanstack/react-query";

type PostGamehubAnonymousRequestundoClient = typeof client<
  PostGamehubAnonymousRequestundoMutationResponse,
  Error,
  never
>;
type PostGamehubAnonymousRequestundo = {
  data: PostGamehubAnonymousRequestundoMutationResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: PostGamehubAnonymousRequestundoQueryParams;
  headerParams: never;
  response: PostGamehubAnonymousRequestundoMutationResponse;
  client: {
    parameters: Partial<Parameters<PostGamehubAnonymousRequestundoClient>[0]>;
    return: Awaited<ReturnType<PostGamehubAnonymousRequestundoClient>>;
  };
};
/**
 * @link /gamehub/anonymous/RequestUndo
 */
export function usePostGamehubAnonymousRequestundo(
  params?: PostGamehubAnonymousRequestundo["queryParams"],
  options: {
    mutation?: UseMutationOptions<
      PostGamehubAnonymousRequestundo["response"],
      PostGamehubAnonymousRequestundo["error"],
      PostGamehubAnonymousRequestundo["request"]
    >;
    client?: PostGamehubAnonymousRequestundo["client"]["parameters"];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async () => {
      const res = await client<
        PostGamehubAnonymousRequestundo["data"],
        PostGamehubAnonymousRequestundo["error"],
        PostGamehubAnonymousRequestundo["request"]
      >({
        method: "post",
        url: `/gamehub/anonymous/RequestUndo`,
        params,
        ...clientOptions,
      });
      return res.data;
    },
    ...mutationOptions,
  });
}
