import type { ChatMessageClientMessage } from "./ChatMessageClientMessage";

 export type PostGamehubRegisteredSendmessageQueryParams = {
    /**
     * @type object | undefined
    */
    messageRequest?: ChatMessageClientMessage;
};
export type PostGamehubRegisteredSendmessageMutationResponse = any;
export type PostGamehubRegisteredSendmessageMutation = {
    Response: PostGamehubRegisteredSendmessageMutationResponse;
    QueryParams: PostGamehubRegisteredSendmessageQueryParams;
};