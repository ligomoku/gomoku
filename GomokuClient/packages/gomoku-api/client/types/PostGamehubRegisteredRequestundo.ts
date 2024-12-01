import type { RequestUndoMessage } from "./RequestUndoMessage.ts";

 export type PostGamehubRegisteredRequestundoQueryParams = {
    /**
     * @type object | undefined
    */
    message?: RequestUndoMessage;
};

 export type PostGamehubRegisteredRequestundoMutationResponse = any;

 export type PostGamehubRegisteredRequestundoMutation = {
    Response: any;
    QueryParams: PostGamehubRegisteredRequestundoQueryParams;
    Errors: any;
};