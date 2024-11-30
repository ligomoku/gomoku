import type { GetGamesByUsernameResponse } from "./GetGamesByUsernameResponse";
import type { PaginationMetadata } from "./PaginationMetadata";

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
