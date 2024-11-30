import type { GetActiveGamesResponseIEnumerablePaginatedResponse } from "./GetActiveGamesResponseIEnumerablePaginatedResponse";

export type GetApiGameAnonymousActiveQueryParams = {
  /**
   * @type integer | undefined, int32
   */
  limit?: number;
  /**
   * @type integer | undefined, int32
   */
  offset?: number;
};
export type GetApiGameAnonymousActiveHeaderParams = {
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
export type GetApiGameAnonymousActive200 =
  GetActiveGamesResponseIEnumerablePaginatedResponse;
/**
 * @description OK
 */
export type GetApiGameAnonymousActiveQueryResponse =
  GetActiveGamesResponseIEnumerablePaginatedResponse;
export type GetApiGameAnonymousActiveQuery = {
  Response: GetApiGameAnonymousActiveQueryResponse;
  QueryParams: GetApiGameAnonymousActiveQueryParams;
  HeaderParams: GetApiGameAnonymousActiveHeaderParams;
};
