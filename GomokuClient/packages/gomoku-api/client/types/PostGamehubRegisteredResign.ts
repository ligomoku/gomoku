import type { ResignClientMessage } from "./ResignClientMessage.ts";

 export type PostGamehubRegisteredResignQueryParams = {
    /**
     * @type object | undefined
    */
    message?: ResignClientMessage;
};

 export type PostGamehubRegisteredResignMutationResponse = any;

 export type PostGamehubRegisteredResignMutation = {
    Response: any;
    QueryParams: PostGamehubRegisteredResignQueryParams;
    Errors: any;
};