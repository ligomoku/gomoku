import type { components } from "@gomoku/api/client/schema";
import type { UseQueryResult } from "@tanstack/react-query";

interface WrappedApiResponse<T> {
  data: T;
  metadata: {
    hasMoreItems: boolean;
    totalCount: number;
  };
}

type ApiResponse<T> =
  | {
      data: T;
      error: undefined;
    }
  | ({
      data: undefined;
      error: components["schemas"]["ProblemDetails"];
    } & {
      request: Request;
      response: Response;
    })
  | { data: undefined; error: unknown };

export const fetchAuthFallback = async <T, R = void>(
  jwtToken: string | undefined,
  authenticatedCall: (
    token: string,
  ) => Promise<UseQueryResult<WrappedApiResponse<T>>>,
  anonymousCall: (
    payload?: R,
  ) => Promise<UseQueryResult<WrappedApiResponse<T>>>,
  anonymousPayload?: R,
): Promise<ApiResponse<T>> => {
  const result = jwtToken
    ? await authenticatedCall(jwtToken)
    : await anonymousCall(anonymousPayload);

  if (result.isError) {
    return {
      data: undefined,
      error: result.error,
    };
  }

  if (!result.data?.data) {
    return {
      data: undefined,
      error: new Error("No data received"),
    };
  }

  return {
    data: result.data.data,
    error: undefined,
  };
};
