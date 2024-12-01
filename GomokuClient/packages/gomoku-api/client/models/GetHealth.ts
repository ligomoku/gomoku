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
export type GetHealthQueryResponse = any;
export type GetHealthQuery = {
  Response: GetHealthQueryResponse;
  HeaderParams: GetHealthHeaderParams;
};
