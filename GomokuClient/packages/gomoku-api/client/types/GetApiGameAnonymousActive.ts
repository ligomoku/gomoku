import type { GetActiveGamesResponseIEnumerablePaginatedResponse } from "./GetActiveGamesResponseIEnumerablePaginatedResponse.ts";

 export type GetApiGameAnonymousActiveQueryParams = {
    /**
     * @type integer | undefined, int32
    */
    limit?: number;
    /**
     * @type integer | undefined, int32
    */
    offset?: number;
};

 export type GetApiGameAnonymousActiveHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
};

 /**
 * @description OK
*/
export type GetApiGameAnonymousActive200 = GetActiveGamesResponseIEnumerablePaginatedResponse;

 export type GetApiGameAnonymousActiveQueryResponse = GetApiGameAnonymousActive200;

 export type GetApiGameAnonymousActiveQuery = {
    Response: GetApiGameAnonymousActive200;
    QueryParams: GetApiGameAnonymousActiveQueryParams;
    HeaderParams: GetApiGameAnonymousActiveHeaderParams;
    Errors: any;
};