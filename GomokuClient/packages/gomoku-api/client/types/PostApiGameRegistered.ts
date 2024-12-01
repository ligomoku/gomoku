import type { CreateGameRequest } from "./CreateGameRequest.ts";
import type { CreateGameResponse } from "./CreateGameResponse.ts";
import type { ProblemDetails } from "./ProblemDetails.ts";

 export type PostApiGameRegisteredHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
    /**
     * @default "Bearer "
     * @type string
    */
    Authorization: string;
};

 /**
 * @description OK
*/
export type PostApiGameRegistered200 = CreateGameResponse;

 /**
 * @description Bad Request
*/
export type PostApiGameRegistered400 = ProblemDetails;

 export type PostApiGameRegisteredMutationRequest = CreateGameRequest;

 export type PostApiGameRegisteredMutationResponse = PostApiGameRegistered200;

 export type PostApiGameRegisteredMutation = {
    Response: PostApiGameRegistered200;
    Request: PostApiGameRegisteredMutationRequest;
    HeaderParams: PostApiGameRegisteredHeaderParams;
    Errors: PostApiGameRegistered400;
};