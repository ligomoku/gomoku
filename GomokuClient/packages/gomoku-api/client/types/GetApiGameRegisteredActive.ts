import type { GetActiveGamesResponseIEnumerablePaginatedResponse } from "./GetActiveGamesResponseIEnumerablePaginatedResponse.ts";

 export type GetApiGameRegisteredActiveQueryParams = {
    /**
     * @type integer | undefined, int32
    */
    limit?: number;
    /**
     * @type integer | undefined, int32
    */
    offset?: number;
};

 export type GetApiGameRegisteredActiveHeaderParams = {
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
export type GetApiGameRegisteredActive200 = GetActiveGamesResponseIEnumerablePaginatedResponse;

 export type GetApiGameRegisteredActiveQueryResponse = GetApiGameRegisteredActive200;

 export type GetApiGameRegisteredActiveQuery = {
    Response: GetApiGameRegisteredActive200;
    QueryParams: GetApiGameRegisteredActiveQueryParams;
    HeaderParams: GetApiGameRegisteredActiveHeaderParams;
    Errors: any;
};