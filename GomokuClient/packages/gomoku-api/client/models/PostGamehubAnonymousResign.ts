import type { ResignClientMessage } from "./ResignClientMessage";

 export type PostGamehubAnonymousResignQueryParams = {
    /**
     * @type object | undefined
    */
    message?: ResignClientMessage;
};
export type PostGamehubAnonymousResignMutationResponse = any;
export type PostGamehubAnonymousResignMutation = {
    Response: PostGamehubAnonymousResignMutationResponse;
    QueryParams: PostGamehubAnonymousResignQueryParams;
};