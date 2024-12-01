export type GetHealthHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
};

 /**
 * @description Server is running
*/
export type GetHealth200 = any;

 export type GetHealthQueryResponse = GetHealth200;

 export type GetHealthQuery = {
    Response: GetHealth200;
    HeaderParams: GetHealthHeaderParams;
    Errors: any;
};