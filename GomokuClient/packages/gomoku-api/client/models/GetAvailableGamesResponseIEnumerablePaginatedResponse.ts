import type { GetAvailableGamesResponse } from "./GetAvailableGamesResponse";
import type { PaginationMetadata } from "./PaginationMetadata";

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
