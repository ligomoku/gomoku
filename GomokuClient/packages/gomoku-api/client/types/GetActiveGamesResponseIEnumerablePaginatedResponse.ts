import type { GetActiveGamesResponse } from "./GetActiveGamesResponse.ts";
import type { PaginationMetadata } from "./PaginationMetadata.ts";

 export type GetActiveGamesResponseIEnumerablePaginatedResponse = {
    /**
     * @type array
    */
    data: GetActiveGamesResponse[];
    /**
     * @type object
    */
    metadata: PaginationMetadata;
};