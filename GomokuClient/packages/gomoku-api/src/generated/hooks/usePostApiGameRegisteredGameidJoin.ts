import client from "@gomoku/api/src/client";
import { useMutation } from "@tanstack/react-query";
import type {
  PostApiGameRegisteredGameidJoinMutationResponse,
  PostApiGameRegisteredGameidJoinPathParams,
  PostApiGameRegisteredGameidJoinHeaderParams,
  PostApiGameRegisteredGameidJoin404,
} from "../models/PostApiGameRegisteredGameidJoin";
import type { UseMutationOptions } from "@tanstack/react-query";

type PostApiGameRegisteredGameidJoinClient = typeof client<
  PostApiGameRegisteredGameidJoinMutationResponse,
  PostApiGameRegisteredGameidJoin404,
  never
>;
type PostApiGameRegisteredGameidJoin = {
  data: PostApiGameRegisteredGameidJoinMutationResponse;
  error: PostApiGameRegisteredGameidJoin404;
  request: never;
  pathParams: PostApiGameRegisteredGameidJoinPathParams;
  queryParams: never;
  headerParams: PostApiGameRegisteredGameidJoinHeaderParams;
  response: PostApiGameRegisteredGameidJoinMutationResponse;
  client: {
    parameters: Partial<Parameters<PostApiGameRegisteredGameidJoinClient>[0]>;
    return: Awaited<ReturnType<PostApiGameRegisteredGameidJoinClient>>;
  };
};
/**
 * @summary Join game
 * @link /api/game/registered/:gameId/join
 */
export function usePostApiGameRegisteredGameidJoin(
  gameId: PostApiGameRegisteredGameidJoinPathParams["gameId"],
  headers: PostApiGameRegisteredGameidJoin["headerParams"],
  options: {
    mutation?: UseMutationOptions<
      PostApiGameRegisteredGameidJoin["response"],
      PostApiGameRegisteredGameidJoin["error"],
      PostApiGameRegisteredGameidJoin["request"]
    >;
    client?: PostApiGameRegisteredGameidJoin["client"]["parameters"];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async () => {
      const res = await client<
        PostApiGameRegisteredGameidJoin["data"],
        PostApiGameRegisteredGameidJoin["error"],
        PostApiGameRegisteredGameidJoin["request"]
      >({
        method: "post",
        url: `/api/game/registered/${gameId}/join`,
        headers: { ...headers, ...clientOptions.headers },
        ...clientOptions,
      });
      return res.data;
    },
    ...mutationOptions,
  });
}
