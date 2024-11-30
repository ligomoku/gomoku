import type { CreateGameResponse } from "./CreateGameResponse";
import type { ProblemDetails } from "./ProblemDetails";
import type { CreateGameRequest } from "./CreateGameRequest";

 export type PostApiGameAnonymousHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
    /**
     * @default "application/json"
     * @type string
    */
    "Content-Type": string;
};
/**
 * @description OK
*/
export type PostApiGameAnonymous200 = CreateGameResponse;
/**
 * @description Bad Request
*/
export type PostApiGameAnonymous400 = ProblemDetails;
export type PostApiGameAnonymousMutationRequest = CreateGameRequest;
/**
 * @description OK
*/
export type PostApiGameAnonymousMutationResponse = CreateGameResponse;
export type PostApiGameAnonymousMutation = {
    Response: PostApiGameAnonymousMutationResponse;
    Request: PostApiGameAnonymousMutationRequest;
    HeaderParams: PostApiGameAnonymousHeaderParams;
    Errors: PostApiGameAnonymous400;
};