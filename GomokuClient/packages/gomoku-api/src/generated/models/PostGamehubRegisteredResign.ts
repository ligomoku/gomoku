import type { ResignClientMessage } from "./ResignClientMessage";

export type PostGamehubRegisteredResignQueryParams = {
  /**
   * @type object | undefined
   */
  message?: ResignClientMessage;
};
export type PostGamehubRegisteredResignMutationResponse = any;
export type PostGamehubRegisteredResignMutation = {
  Response: PostGamehubRegisteredResignMutationResponse;
  QueryParams: PostGamehubRegisteredResignQueryParams;
};
