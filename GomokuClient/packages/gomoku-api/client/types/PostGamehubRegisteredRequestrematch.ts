import type { RematchRequestMessage } from "./RematchRequestMessage.ts";

 export type PostGamehubRegisteredRequestrematchQueryParams = {
    /**
     * @type object | undefined
    */
    message?: RematchRequestMessage;
};

 export type PostGamehubRegisteredRequestrematchMutationResponse = any;

 export type PostGamehubRegisteredRequestrematchMutation = {
    Response: any;
    QueryParams: PostGamehubRegisteredRequestrematchQueryParams;
    Errors: any;
};