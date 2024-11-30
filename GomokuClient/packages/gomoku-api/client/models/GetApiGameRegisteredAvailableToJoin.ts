import type { GetAvailableGamesResponseIEnumerablePaginatedResponse } from "./GetAvailableGamesResponseIEnumerablePaginatedResponse";

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
    /**
     * @default "application/json"
     * @type string
    */
    "Content-Type": string;
};
/**
 * @description OK
*/
export type GetApiGameRegisteredAvailableToJoin200 = GetAvailableGamesResponseIEnumerablePaginatedResponse;
/**
 * @description OK
*/
export type GetApiGameRegisteredAvailableToJoinQueryResponse = GetAvailableGamesResponseIEnumerablePaginatedResponse;
export type GetApiGameRegisteredAvailableToJoinQuery = {
    Response: GetApiGameRegisteredAvailableToJoinQueryResponse;
    QueryParams: GetApiGameRegisteredAvailableToJoinQueryParams;
    HeaderParams: GetApiGameRegisteredAvailableToJoinHeaderParams;
};