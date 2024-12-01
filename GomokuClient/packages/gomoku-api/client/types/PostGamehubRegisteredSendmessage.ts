import type { ChatMessageClientMessage } from "./ChatMessageClientMessage.ts";

 export type PostGamehubRegisteredSendmessageQueryParams = {
    /**
     * @type object | undefined
    */
    messageRequest?: ChatMessageClientMessage;
};

 export type PostGamehubRegisteredSendmessageMutationResponse = any;

 export type PostGamehubRegisteredSendmessageMutation = {
    Response: any;
    QueryParams: PostGamehubRegisteredSendmessageQueryParams;
    Errors: any;
};