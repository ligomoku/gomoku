import type { RematchRequestMessage } from "./RematchRequestMessage.ts";

 export type PostGamehubAnonymousRequestrematchQueryParams = {
    /**
     * @type object | undefined
    */
    message?: RematchRequestMessage;
};

 export type PostGamehubAnonymousRequestrematchMutationResponse = any;

 export type PostGamehubAnonymousRequestrematchMutation = {
    Response: any;
    QueryParams: PostGamehubAnonymousRequestrematchQueryParams;
    Errors: any;
};