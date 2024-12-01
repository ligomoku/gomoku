import type { GetAvailableGamesResponseIEnumerablePaginatedResponse } from "./GetAvailableGamesResponseIEnumerablePaginatedResponse.ts";

 export type GetApiGameAnonymousAvailableToJoinQueryParams = {
    /**
     * @type integer | undefined, int32
    */
    limit?: number;
    /**
     * @type integer | undefined, int32
    */
    offset?: number;
};

 export type GetApiGameAnonymousAvailableToJoinHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
};

 /**
 * @description OK
*/
export type GetApiGameAnonymousAvailableToJoin200 = GetAvailableGamesResponseIEnumerablePaginatedResponse;

 export type GetApiGameAnonymousAvailableToJoinQueryResponse = GetApiGameAnonymousAvailableToJoin200;

 export type GetApiGameAnonymousAvailableToJoinQuery = {
    Response: GetApiGameAnonymousAvailableToJoin200;
    QueryParams: GetApiGameAnonymousAvailableToJoinQueryParams;
    HeaderParams: GetApiGameAnonymousAvailableToJoinHeaderParams;
    Errors: any;
};