import type { GetGameHistoryResponse } from "./GetGameHistoryResponse.ts";
import type { ProblemDetails } from "./ProblemDetails.ts";

 export type GetApiGameAnonymousGameidHistoryPathParams = {
    /**
     * @type string
    */
    gameId: string;
};

 export type GetApiGameAnonymousGameidHistoryHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
};

 /**
 * @description OK
*/
export type GetApiGameAnonymousGameidHistory200 = GetGameHistoryResponse;

 /**
 * @description Not Found
*/
export type GetApiGameAnonymousGameidHistory404 = ProblemDetails;

 export type GetApiGameAnonymousGameidHistoryQueryResponse = GetApiGameAnonymousGameidHistory200;

 export type GetApiGameAnonymousGameidHistoryQuery = {
    Response: GetApiGameAnonymousGameidHistory200;
    PathParams: GetApiGameAnonymousGameidHistoryPathParams;
    HeaderParams: GetApiGameAnonymousGameidHistoryHeaderParams;
    Errors: GetApiGameAnonymousGameidHistory404;
};