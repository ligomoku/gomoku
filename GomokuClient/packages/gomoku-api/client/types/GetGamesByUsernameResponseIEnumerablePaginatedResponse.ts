import type { GetGamesByUsernameResponse } from "./GetGamesByUsernameResponse.ts";
import type { PaginationMetadata } from "./PaginationMetadata.ts";

 export type GetGamesByUsernameResponseIEnumerablePaginatedResponse = {
    /**
     * @type array
    */
    data: GetGamesByUsernameResponse[];
    /**
     * @type object
    */
    metadata: PaginationMetadata;
};