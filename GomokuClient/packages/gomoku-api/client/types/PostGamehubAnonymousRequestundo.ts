import type { RequestUndoMessage } from "./RequestUndoMessage.ts";

 export type PostGamehubAnonymousRequestundoQueryParams = {
    /**
     * @type object | undefined
    */
    message?: RequestUndoMessage;
};

 export type PostGamehubAnonymousRequestundoMutationResponse = any;

 export type PostGamehubAnonymousRequestundoMutation = {
    Response: any;
    QueryParams: PostGamehubAnonymousRequestundoQueryParams;
    Errors: any;
};