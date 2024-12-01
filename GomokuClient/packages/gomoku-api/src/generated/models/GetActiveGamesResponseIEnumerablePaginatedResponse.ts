import type { GetActiveGamesResponse } from "./GetActiveGamesResponse";
import type { PaginationMetadata } from "./PaginationMetadata";

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
