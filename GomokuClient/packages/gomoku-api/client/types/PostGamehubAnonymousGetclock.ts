import type { GetClockMessage } from "./GetClockMessage.ts";

 export type PostGamehubAnonymousGetclockQueryParams = {
    /**
     * @type object | undefined
    */
    message?: GetClockMessage;
};

 export type PostGamehubAnonymousGetclockMutationResponse = any;

 export type PostGamehubAnonymousGetclockMutation = {
    Response: any;
    QueryParams: PostGamehubAnonymousGetclockQueryParams;
    Errors: any;
};