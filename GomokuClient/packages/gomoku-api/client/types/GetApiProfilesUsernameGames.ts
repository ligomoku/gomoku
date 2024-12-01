import type { GetGamesByUsernameResponseIEnumerablePaginatedResponse } from "./GetGamesByUsernameResponseIEnumerablePaginatedResponse.ts";

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
export type GetApiProfilesUsernameGames200 = GetGamesByUsernameResponseIEnumerablePaginatedResponse;

 export type GetApiProfilesUsernameGamesQueryResponse = GetApiProfilesUsernameGames200;

 export type GetApiProfilesUsernameGamesQuery = {
    Response: GetApiProfilesUsernameGames200;
    PathParams: GetApiProfilesUsernameGamesPathParams;
    QueryParams: GetApiProfilesUsernameGamesQueryParams;
    HeaderParams: GetApiProfilesUsernameGamesHeaderParams;
    Errors: any;
};