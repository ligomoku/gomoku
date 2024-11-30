import type { CreateGameResponse } from "./CreateGameResponse";
import type { ProblemDetails } from "./ProblemDetails";
import type { CreateGameRequest } from "./CreateGameRequest";

export type PostApiGameRegisteredHeaderParams = {
  /**
   * @type string | undefined
   */
  "X-Version"?: string;
  /**
   * @default "Bearer "
   * @type string
   */
  Authorization: string;
  /**
   * @default "application/json"
   * @type string
   */
  "Content-Type": string;
};
/**
 * @description OK
 */
export type PostApiGameRegistered200 = CreateGameResponse;
/**
 * @description Bad Request
 */
export type PostApiGameRegistered400 = ProblemDetails;
export type PostApiGameRegisteredMutationRequest = CreateGameRequest;
/**
 * @description OK
 */
export type PostApiGameRegisteredMutationResponse = CreateGameResponse;
export type PostApiGameRegisteredMutation = {
  Response: PostApiGameRegisteredMutationResponse;
  Request: PostApiGameRegisteredMutationRequest;
  HeaderParams: PostApiGameRegisteredHeaderParams;
  Errors: PostApiGameRegistered400;
};
