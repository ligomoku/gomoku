export type GetApiRapfiTestHeaderParams = {
  /**
   * @type string | undefined
   */
  "X-Version"?: string;
};
/**
 * @description Connection successful
 */
export type GetApiRapfiTest200 = any;
/**
 * @description Connection failed
 */
export type GetApiRapfiTest500 = any;
export type GetApiRapfiTestQueryResponse = any;
export type GetApiRapfiTestQuery = {
  Response: GetApiRapfiTestQueryResponse;
  HeaderParams: GetApiRapfiTestHeaderParams;
  Errors: GetApiRapfiTest500;
};
