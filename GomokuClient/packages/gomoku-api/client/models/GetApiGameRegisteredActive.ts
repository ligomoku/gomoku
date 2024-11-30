import type { GetActiveGamesResponseIEnumerablePaginatedResponse } from "./GetActiveGamesResponseIEnumerablePaginatedResponse";

export type GetApiGameRegisteredActiveQueryParams = {
  /**
   * @type integer | undefined, int32
   */
  limit?: number;
  /**
   * @type integer | undefined, int32
   */
  offset?: number;
};
export type GetApiGameRegisteredActiveHeaderParams = {
  /**
   * @type string | undefined
   */
  "X-Version"?: string;
  /**
   * @default "Bearer "
   * @type string
   */
  Authorization: string;
};
/**
 * @description OK
 */
export type GetApiGameRegisteredActive200 =
  GetActiveGamesResponseIEnumerablePaginatedResponse;
/**
 * @description OK
 */
export type GetApiGameRegisteredActiveQueryResponse =
  GetActiveGamesResponseIEnumerablePaginatedResponse;
export type GetApiGameRegisteredActiveQuery = {
  Response: GetApiGameRegisteredActiveQueryResponse;
  QueryParams: GetApiGameRegisteredActiveQueryParams;
  HeaderParams: GetApiGameRegisteredActiveHeaderParams;
};
