import type { GetClockMessage } from "./GetClockMessage.ts";

 export type PostGamehubRegisteredGetclockQueryParams = {
    /**
     * @type object | undefined
    */
    message?: GetClockMessage;
};

 export type PostGamehubRegisteredGetclockMutationResponse = any;

 export type PostGamehubRegisteredGetclockMutation = {
    Response: any;
    QueryParams: PostGamehubRegisteredGetclockQueryParams;
    Errors: any;
};