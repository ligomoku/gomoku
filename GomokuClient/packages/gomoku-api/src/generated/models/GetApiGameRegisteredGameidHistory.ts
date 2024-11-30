import type { GetGameHistoryResponse } from "./GetGameHistoryResponse";
import type { ProblemDetails } from "./ProblemDetails";

 export type GetApiGameRegisteredGameidHistoryPathParams = {
    /**
     * @type string
    */
    gameId: string;
};
export type GetApiGameRegisteredGameidHistoryHeaderParams = {
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
export type GetApiGameRegisteredGameidHistory200 = GetGameHistoryResponse;
/**
 * @description Not Found
*/
export type GetApiGameRegisteredGameidHistory404 = ProblemDetails;
/**
 * @description OK
*/
export type GetApiGameRegisteredGameidHistoryQueryResponse = GetGameHistoryResponse;
export type GetApiGameRegisteredGameidHistoryQuery = {
    Response: GetApiGameRegisteredGameidHistoryQueryResponse;
    PathParams: GetApiGameRegisteredGameidHistoryPathParams;
    HeaderParams: GetApiGameRegisteredGameidHistoryHeaderParams;
    Errors: GetApiGameRegisteredGameidHistory404;
};