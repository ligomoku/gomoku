import type { SwaggerTypes } from "@/api";

type ApiResponse<T> =
  | {
      data: T;
      error: undefined;
    }
  | ({
      data: undefined;
      error: SwaggerTypes.ProblemDetails;
    } & {
      request: Request;
      response: Response;
    })
  | { data: undefined; error: unknown };

export const fetchAuthFallback = async <T, R = void>(
  jwtToken: string | undefined,
  authenticatedCall: (token: string) => Promise<ApiResponse<T>>,
  anonymousCall: (payload?: R) => Promise<ApiResponse<T>>,
  anonymousPayload?: R,
): Promise<ApiResponse<T>> =>
  jwtToken
    ? await authenticatedCall(jwtToken)
    : await anonymousCall(anonymousPayload);
