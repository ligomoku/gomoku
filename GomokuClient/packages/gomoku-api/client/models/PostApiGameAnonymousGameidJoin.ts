import type { AddPlayerToGameResponse } from "./AddPlayerToGameResponse";
import type { ProblemDetails } from "./ProblemDetails";
import type { AddAnonymousPlayerToGameRequest } from "./AddAnonymousPlayerToGameRequest";

export type PostApiGameAnonymousGameidJoinPathParams = {
  /**
   * @type string
   */
  gameId: string;
};
export type PostApiGameAnonymousGameidJoinHeaderParams = {
  /**
   * @type string | undefined
   */
  "X-Version"?: string;
};
/**
 * @description Player with specified id successfully joined the game
 */
export type PostApiGameAnonymousGameidJoin200 = AddPlayerToGameResponse;
/**
 * @description Game or player with specified id not found
 */
export type PostApiGameAnonymousGameidJoin404 = ProblemDetails;
export type PostApiGameAnonymousGameidJoinMutationRequest =
  AddAnonymousPlayerToGameRequest;
/**
 * @description Player with specified id successfully joined the game
 */
export type PostApiGameAnonymousGameidJoinMutationResponse =
  AddPlayerToGameResponse;
export type PostApiGameAnonymousGameidJoinMutation = {
  Response: PostApiGameAnonymousGameidJoinMutationResponse;
  Request: PostApiGameAnonymousGameidJoinMutationRequest;
  PathParams: PostApiGameAnonymousGameidJoinPathParams;
  HeaderParams: PostApiGameAnonymousGameidJoinHeaderParams;
  Errors: PostApiGameAnonymousGameidJoin404;
};
