import type { GetAvailableGamesResponse } from "./GetAvailableGamesResponse.ts";
import type { PaginationMetadata } from "./PaginationMetadata.ts";

 export type GetAvailableGamesResponseIEnumerablePaginatedResponse = {
    /**
     * @type array
    */
    data: GetAvailableGamesResponse[];
    /**
     * @type object
    */
    metadata: PaginationMetadata;
};