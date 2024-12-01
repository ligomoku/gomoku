import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type {
  PostGamehubRegisteredGetclockMutationResponse,
  PostGamehubRegisteredGetclockQueryParams,
} from "../models/PostGamehubRegisteredGetclock";
import type { UseMutationOptions } from "@tanstack/react-query";

type PostGamehubRegisteredGetclockClient = typeof client<
  PostGamehubRegisteredGetclockMutationResponse,
  Error,
  never
>;
type PostGamehubRegisteredGetclock = {
  data: PostGamehubRegisteredGetclockMutationResponse;
  error: Error;
  request: never;
  pathParams: never;
  queryParams: PostGamehubRegisteredGetclockQueryParams;
  headerParams: never;
  response: PostGamehubRegisteredGetclockMutationResponse;
  client: {
    parameters: Partial<Parameters<PostGamehubRegisteredGetclockClient>[0]>;
    return: Awaited<ReturnType<PostGamehubRegisteredGetclockClient>>;
  };
};
/**
 * @link /gamehub/registered/GetClock
 */
export function usePostGamehubRegisteredGetclock(
  params?: PostGamehubRegisteredGetclock["queryParams"],
  options: {
    mutation?: UseMutationOptions<
      PostGamehubRegisteredGetclock["response"],
      PostGamehubRegisteredGetclock["error"],
      PostGamehubRegisteredGetclock["request"]
    >;
    client?: PostGamehubRegisteredGetclock["client"]["parameters"];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async () => {
      const res = await client<
        PostGamehubRegisteredGetclock["data"],
        PostGamehubRegisteredGetclock["error"],
        PostGamehubRegisteredGetclock["request"]
      >({
        method: "post",
        url: `/gamehub/registered/GetClock`,
        params,
        ...clientOptions,
      });
      return res.data;
    },
    ...mutationOptions,
  });
}
