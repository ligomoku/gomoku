import type { ChatMessageClientMessage } from "./ChatMessageClientMessage";

export type PostGamehubAnonymousSendmessageQueryParams = {
  /**
   * @type object | undefined
   */
  messageRequest?: ChatMessageClientMessage;
};
export type PostGamehubAnonymousSendmessageMutationResponse = any;
export type PostGamehubAnonymousSendmessageMutation = {
  Response: PostGamehubAnonymousSendmessageMutationResponse;
  QueryParams: PostGamehubAnonymousSendmessageQueryParams;
};
