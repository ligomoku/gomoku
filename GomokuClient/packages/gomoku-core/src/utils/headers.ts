/**
 * Utility class for generating default headers for API requests.
 */
export class Headers {
  // Default Content-Type for all requests
  private static readonly CONTENT_TYPE = "application/json";

  // Default API version, if applicable
  private static readonly VERSION = "1";

  /**
   * Returns default headers without authorization.
   * This is typically used for public or unauthenticated API calls.
   */
  public static getDefaultHeadersWithoutAuth(): {
    "Content-Type": string;
    "X-Version"?: string;
  } {
    return {
      "Content-Type": this.CONTENT_TYPE,
      "X-Version": this.VERSION,
    };
  }

  /**
   * Returns default headers with authorization.
   * This is used for authenticated API calls.
   *
   * @param authToken - A valid authentication token
   */
  public static getDefaultHeadersWithAuth(authToken: string): {
    "Content-Type": string;
    "X-Version"?: string;
    Authorization: string;
  } {
    return {
      "Content-Type": this.CONTENT_TYPE,
      "X-Version": this.VERSION,
      Authorization: `Bearer ${authToken}`,
    };
  }

  /**
   * Returns default headers, optionally including authorization.
   * The return type adapts dynamically based on whether an auth token is provided.
   *
   * @param authToken - Optional authentication token
   */
  public static getDefaultHeaders(authToken?: string): {
    "Content-Type": string;
    "X-Version"?: string;
    Authorization?: string;
  } {
    const headers: {
      "Content-Type": string;
      "X-Version"?: string;
      Authorization?: string;
    } = {
      "Content-Type": this.CONTENT_TYPE,
      "X-Version": this.VERSION,
    };

    // Add Authorization header if authToken is provided
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    return headers;
  }
}
