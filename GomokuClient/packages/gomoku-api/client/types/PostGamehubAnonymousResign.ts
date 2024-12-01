import type { ResignClientMessage } from "./ResignClientMessage.ts";

 export type PostGamehubAnonymousResignQueryParams = {
    /**
     * @type object | undefined
    */
    message?: ResignClientMessage;
};

 export type PostGamehubAnonymousResignMutationResponse = any;

 export type PostGamehubAnonymousResignMutation = {
    Response: any;
    QueryParams: PostGamehubAnonymousResignQueryParams;
    Errors: any;
};