import type { GetGameHistoryResponse } from "./GetGameHistoryResponse";
import type { ProblemDetails } from "./ProblemDetails";

export type GetApiGameAnonymousGameidHistoryPathParams = {
  /**
   * @type string
   */
  gameId: string;
};
export type GetApiGameAnonymousGameidHistoryHeaderParams = {
  /**
   * @type string | undefined
   */
  "X-Version"?: string;
  /**
   * @default "application/json"
   * @type string
   */
  "Content-Type": string;
};
/**
 * @description OK
 */
export type GetApiGameAnonymousGameidHistory200 = GetGameHistoryResponse;
/**
 * @description Not Found
 */
export type GetApiGameAnonymousGameidHistory404 = ProblemDetails;
/**
 * @description OK
 */
export type GetApiGameAnonymousGameidHistoryQueryResponse =
  GetGameHistoryResponse;
export type GetApiGameAnonymousGameidHistoryQuery = {
  Response: GetApiGameAnonymousGameidHistoryQueryResponse;
  PathParams: GetApiGameAnonymousGameidHistoryPathParams;
  HeaderParams: GetApiGameAnonymousGameidHistoryHeaderParams;
  Errors: GetApiGameAnonymousGameidHistory404;
};
