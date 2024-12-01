import type { ChatMessageClientMessage } from "./ChatMessageClientMessage.ts";

 export type PostGamehubAnonymousSendmessageQueryParams = {
    /**
     * @type object | undefined
    */
    messageRequest?: ChatMessageClientMessage;
};

 export type PostGamehubAnonymousSendmessageMutationResponse = any;

 export type PostGamehubAnonymousSendmessageMutation = {
    Response: any;
    QueryParams: PostGamehubAnonymousSendmessageQueryParams;
    Errors: any;
};