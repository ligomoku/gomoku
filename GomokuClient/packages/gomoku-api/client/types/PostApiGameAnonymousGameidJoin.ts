import type { AddAnonymousPlayerToGameRequest } from "./AddAnonymousPlayerToGameRequest.ts";
import type { AddPlayerToGameResponse } from "./AddPlayerToGameResponse.ts";
import type { ProblemDetails } from "./ProblemDetails.ts";

 export type PostApiGameAnonymousGameidJoinPathParams = {
    /**
     * @type string
    */
    gameId: string;
};

 export type PostApiGameAnonymousGameidJoinHeaderParams = {
    /**
     * @type string | undefined
    */
    "X-Version"?: string;
};

 /**
 * @description Player with specified id successfully joined the game
*/
export type PostApiGameAnonymousGameidJoin200 = AddPlayerToGameResponse;

 /**
 * @description Game or player with specified id not found
*/
export type PostApiGameAnonymousGameidJoin404 = ProblemDetails;

 export type PostApiGameAnonymousGameidJoinMutationRequest = AddAnonymousPlayerToGameRequest;

 export type PostApiGameAnonymousGameidJoinMutationResponse = PostApiGameAnonymousGameidJoin200;

 export type PostApiGameAnonymousGameidJoinMutation = {
    Response: PostApiGameAnonymousGameidJoin200;
    Request: PostApiGameAnonymousGameidJoinMutationRequest;
    PathParams: PostApiGameAnonymousGameidJoinPathParams;
    HeaderParams: PostApiGameAnonymousGameidJoinHeaderParams;
    Errors: PostApiGameAnonymousGameidJoin404;
};