import type { GetAvailableGamesResponseIEnumerablePaginatedResponse } from "./GetAvailableGamesResponseIEnumerablePaginatedResponse.ts";

 export type GetApiGameRegisteredAvailableToJoinQueryParams = {
    /**
     * @type integer | undefined, int32
    */
    limit?: number;
    /**
     * @type integer | undefined, int32
    */
    offset?: number;
};

 export type GetApiGameRegisteredAvailableToJoinHeaderParams = {
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
export type GetApiGameRegisteredAvailableToJoin200 = GetAvailableGamesResponseIEnumerablePaginatedResponse;

 export type GetApiGameRegisteredAvailableToJoinQueryResponse = GetApiGameRegisteredAvailableToJoin200;

 export type GetApiGameRegisteredAvailableToJoinQuery = {
    Response: GetApiGameRegisteredAvailableToJoin200;
    QueryParams: GetApiGameRegisteredAvailableToJoinQueryParams;
    HeaderParams: GetApiGameRegisteredAvailableToJoinHeaderParams;
    Errors: any;
};