import type { AddPlayerToGameResponse } from "./AddPlayerToGameResponse.ts";
import type { ProblemDetails } from "./ProblemDetails.ts";

 export type PostApiGameRegisteredGameidJoinPathParams = {
    /**
     * @type string
    */
    gameId: string;
};

 export type PostApiGameRegisteredGameidJoinHeaderParams = {
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
 * @description Player with specified id successfully joined the game
*/
export type PostApiGameRegisteredGameidJoin200 = AddPlayerToGameResponse;

 /**
 * @description Game or player with specified id not found
*/
export type PostApiGameRegisteredGameidJoin404 = ProblemDetails;

 export type PostApiGameRegisteredGameidJoinMutationResponse = PostApiGameRegisteredGameidJoin200;

 export type PostApiGameRegisteredGameidJoinMutation = {
    Response: PostApiGameRegisteredGameidJoin200;
    PathParams: PostApiGameRegisteredGameidJoinPathParams;
    HeaderParams: PostApiGameRegisteredGameidJoinHeaderParams;
    Errors: PostApiGameRegisteredGameidJoin404;
};