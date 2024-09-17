import { GetApiV2GameByGameIdData } from "../api/client";

/**
 * A utility function to create request options with default headers.
 * This function satisfies TypeScript type requirements and leverages globally configured headers.
 *
 * @param options - The options for the API request without headers.
 * @returns - The complete options including headers for the API request.
 */
export const createRequestOptions = (
  options: Omit<GetApiV2GameByGameIdData, "headers">,
): GetApiV2GameByGameIdData => {
  return {
    ...options,
    headers: {
      "X-Version": import.meta.env.VITE_API_VERSION,
    },
  };
};
