import type { GetGamesByUsernameResponseIEnumerablePaginatedResponse } from "./GetGamesByUsernameResponseIEnumerablePaginatedResponse";

export type GetApiProfilesUsernameGamesPathParams = {
  /**
   * @type string
   */
  userName: string;
};
export type GetApiProfilesUsernameGamesQueryParams = {
  /**
   * @type integer | undefined, int32
   */
  limit?: number;
  /**
   * @type integer | undefined, int32
   */
  offset?: number;
};
export type GetApiProfilesUsernameGamesHeaderParams = {
  /**
   * @type string | undefined
   */
  "X-Version"?: string;
};
/**
 * @description Information about user games
 */
export type GetApiProfilesUsernameGames200 =
  GetGamesByUsernameResponseIEnumerablePaginatedResponse;
/**
 * @description Information about user games
 */
export type GetApiProfilesUsernameGamesQueryResponse =
  GetGamesByUsernameResponseIEnumerablePaginatedResponse;
export type GetApiProfilesUsernameGamesQuery = {
  Response: GetApiProfilesUsernameGamesQueryResponse;
  PathParams: GetApiProfilesUsernameGamesPathParams;
  QueryParams: GetApiProfilesUsernameGamesQueryParams;
  HeaderParams: GetApiProfilesUsernameGamesHeaderParams;
};
