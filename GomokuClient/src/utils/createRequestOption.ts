type ApiHeaders = {
  "X-Version": string;
  [key: string]: string;
};

/**
 * A utility function to create request options with default headers.
 * This function satisfies TypeScript type requirements and leverages globally configured headers.
 *
 * @param options - The options for the API request without headers.
 * @returns - The complete options including headers for the API request.
 */
export const createRequestOptions = <
  T extends { headers?: Partial<ApiHeaders>; [key: string]: unknown },
>(
  options: T,
): T & { headers: ApiHeaders } => {
  const defaultHeaders: ApiHeaders = {
    "X-Version": String(import.meta.env.VITE_API_VERSION),
    ...options.headers,
  };

  return {
    ...options,
    headers: defaultHeaders,
  };
};
