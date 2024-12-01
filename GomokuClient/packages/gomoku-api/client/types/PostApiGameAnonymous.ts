import type { CreateGameRequest } from "./CreateGameRequest.ts";
import type { CreateGameResponse } from "./CreateGameResponse.ts";
import type { ProblemDetails } from "./ProblemDetails.ts";

 export type PostApiGameAnonymousHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
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

 export type PostApiGameAnonymousMutationResponse = PostApiGameAnonymous200;

 export type PostApiGameAnonymousMutation = {
    Response: PostApiGameAnonymous200;
    Request: PostApiGameAnonymousMutationRequest;
    HeaderParams: PostApiGameAnonymousHeaderParams;
    Errors: PostApiGameAnonymous400;
};