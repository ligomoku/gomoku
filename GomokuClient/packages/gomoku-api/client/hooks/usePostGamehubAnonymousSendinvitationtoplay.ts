import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type {
  PostGamehubAnonymousSendinvitationtoplayMutationResponse,
  PostGamehubAnonymousSendinvitationtoplayQueryParams,
} from "../models/PostGamehubAnonymousSendinvitationtoplay";
import type { UseMutationOptions } from "@tanstack/react-query";

type PostGamehubAnonymousSendinvitationtoplayClient = typeof client<
  PostGamehubAnonymousSendinvitationtoplayMutationResponse,
  Error,
  never
>;
type PostGamehubAnonymousSendinvitationtoplay = {
  data: PostGamehubAnonymousSendinvitationtoplayMutationResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: PostGamehubAnonymousSendinvitationtoplayQueryParams;
  headerParams: never;
  response: PostGamehubAnonymousSendinvitationtoplayMutationResponse;
  client: {
    parameters: Partial<
      Parameters<PostGamehubAnonymousSendinvitationtoplayClient>[0]
    >;
    return: Awaited<ReturnType<PostGamehubAnonymousSendinvitationtoplayClient>>;
  };
};
/**
 * @link /gamehub/anonymous/SendInvitationToPlay
 */
export function usePostGamehubAnonymousSendinvitationtoplay(
  params?: PostGamehubAnonymousSendinvitationtoplay["queryParams"],
  options: {
    mutation?: UseMutationOptions<
      PostGamehubAnonymousSendinvitationtoplay["response"],
      PostGamehubAnonymousSendinvitationtoplay["error"],
      PostGamehubAnonymousSendinvitationtoplay["request"]
    >;
    client?: PostGamehubAnonymousSendinvitationtoplay["client"]["parameters"];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async () => {
      const res = await client<
        PostGamehubAnonymousSendinvitationtoplay["data"],
        PostGamehubAnonymousSendinvitationtoplay["error"],
        PostGamehubAnonymousSendinvitationtoplay["request"]
      >({
        method: "post",
        url: `/gamehub/anonymous/SendInvitationToPlay`,
        params,
        ...clientOptions,
      });
      return res.data;
    },
    ...mutationOptions,
  });
}
