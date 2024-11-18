export class Headers {
  private static readonly CONTENT_TYPE = "application/json";
  private static readonly VERSION = "1";

  /**
   * Returns default headers without authorization.
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
   * The return type is adjusted to the stricter format when an auth token is provided.
   */
  public static getDefaultHeaders(authToken: string): {
    "Content-Type": string;
    "X-Version"?: string;
    Authorization: string;
  };
  // eslint-disable-next-line no-dupe-class-members
  public static getDefaultHeaders(): {
    "Content-Type": string;
    "X-Version"?: string;
  };
  // eslint-disable-next-line no-dupe-class-members
  public static getDefaultHeaders(authToken?: string): {
    "Content-Type": string;
    "X-Version"?: string;
    Authorization?: string;
  } {
    if (authToken) {
      return this.getDefaultHeadersWithAuth(authToken);
    }
    return this.getDefaultHeadersWithoutAuth();
  }
}
