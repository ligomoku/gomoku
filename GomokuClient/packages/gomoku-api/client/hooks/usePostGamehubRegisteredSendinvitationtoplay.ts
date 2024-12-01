import client from "../../http";
import { useMutation } from "@tanstack/react-query";
import type {
  PostGamehubRegisteredSendinvitationtoplayMutationResponse,
  PostGamehubRegisteredSendinvitationtoplayQueryParams,
} from "../models/PostGamehubRegisteredSendinvitationtoplay";
import type { UseMutationOptions } from "@tanstack/react-query";

type PostGamehubRegisteredSendinvitationtoplayClient = typeof client<
  PostGamehubRegisteredSendinvitationtoplayMutationResponse,
  Error,
  never
>;
type PostGamehubRegisteredSendinvitationtoplay = {
  data: PostGamehubRegisteredSendinvitationtoplayMutationResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: PostGamehubRegisteredSendinvitationtoplayQueryParams;
  headerParams: never;
  response: PostGamehubRegisteredSendinvitationtoplayMutationResponse;
  client: {
    parameters: Partial<
      Parameters<PostGamehubRegisteredSendinvitationtoplayClient>[0]
    >;
    return: Awaited<
      ReturnType<PostGamehubRegisteredSendinvitationtoplayClient>
    >;
  };
};
/**
 * @link /gamehub/registered/SendInvitationToPlay
 */
export function usePostGamehubRegisteredSendinvitationtoplay(
  params?: PostGamehubRegisteredSendinvitationtoplay["queryParams"],
  options: {
    mutation?: UseMutationOptions<
      PostGamehubRegisteredSendinvitationtoplay["response"],
      PostGamehubRegisteredSendinvitationtoplay["error"],
      PostGamehubRegisteredSendinvitationtoplay["request"]
    >;
    client?: PostGamehubRegisteredSendinvitationtoplay["client"]["parameters"];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async () => {
      const res = await client<
        PostGamehubRegisteredSendinvitationtoplay["data"],
        PostGamehubRegisteredSendinvitationtoplay["error"],
        PostGamehubRegisteredSendinvitationtoplay["request"]
      >({
        method: "post",
        url: `/gamehub/registered/SendInvitationToPlay`,
        params,
        ...clientOptions,
      });
      return res.data;
    },
    ...mutationOptions,
  });
}
