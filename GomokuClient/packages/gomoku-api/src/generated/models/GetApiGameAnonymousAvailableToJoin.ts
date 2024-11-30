import type { GetAvailableGamesResponseIEnumerablePaginatedResponse } from "./GetAvailableGamesResponseIEnumerablePaginatedResponse";

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
    /**
     * @default "application/json"
     * @type string
    */
    "Content-Type": string;
};
/**
 * @description OK
*/
export type GetApiGameAnonymousAvailableToJoin200 = GetAvailableGamesResponseIEnumerablePaginatedResponse;
/**
 * @description OK
*/
export type GetApiGameAnonymousAvailableToJoinQueryResponse = GetAvailableGamesResponseIEnumerablePaginatedResponse;
export type GetApiGameAnonymousAvailableToJoinQuery = {
    Response: GetApiGameAnonymousAvailableToJoinQueryResponse;
    QueryParams: GetApiGameAnonymousAvailableToJoinQueryParams;
    HeaderParams: GetApiGameAnonymousAvailableToJoinHeaderParams;
};