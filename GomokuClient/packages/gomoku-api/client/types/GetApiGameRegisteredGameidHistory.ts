import type { GetGameHistoryResponse } from "./GetGameHistoryResponse.ts";
import type { ProblemDetails } from "./ProblemDetails.ts";

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
};

 /**
 * @description OK
*/
export type GetApiGameRegisteredGameidHistory200 = GetGameHistoryResponse;

 /**
 * @description Not Found
*/
export type GetApiGameRegisteredGameidHistory404 = ProblemDetails;

 export type GetApiGameRegisteredGameidHistoryQueryResponse = GetApiGameRegisteredGameidHistory200;

 export type GetApiGameRegisteredGameidHistoryQuery = {
    Response: GetApiGameRegisteredGameidHistory200;
    PathParams: GetApiGameRegisteredGameidHistoryPathParams;
    HeaderParams: GetApiGameRegisteredGameidHistoryHeaderParams;
    Errors: GetApiGameRegisteredGameidHistory404;
};