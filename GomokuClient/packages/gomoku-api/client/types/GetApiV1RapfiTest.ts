export type GetApiV1RapfiTestHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
};

 /**
 * @description Connection successful
*/
export type GetApiV1RapfiTest200 = any;

 /**
 * @description Connection failed
*/
export type GetApiV1RapfiTest500 = any;

 export type GetApiV1RapfiTestQueryResponse = GetApiV1RapfiTest200;

 export type GetApiV1RapfiTestQuery = {
    Response: GetApiV1RapfiTest200;
    HeaderParams: GetApiV1RapfiTestHeaderParams;
    Errors: GetApiV1RapfiTest500;
};