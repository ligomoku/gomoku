import type { ApproveUndoMessage } from "./ApproveUndoMessage.ts";

 export type PostGamehubRegisteredApproveundoQueryParams = {
    /**
     * @type object | undefined
    */
    message?: ApproveUndoMessage;
};

 export type PostGamehubRegisteredApproveundoMutationResponse = any;

 export type PostGamehubRegisteredApproveundoMutation = {
    Response: any;
    QueryParams: PostGamehubRegisteredApproveundoQueryParams;
    Errors: any;
};