// packages/gomoku-api/client/http.ts
/// <reference types="vite/client" />

export type ClientConfig<TQueryParams = unknown> = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  data?: unknown;
  params?: TQueryParams;
};

const stringifyParams = (params: unknown): Record<string, string> => {
  if (!params) return {};
  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value === undefined) return acc;
      if (typeof value === "object") {
        acc[key] = JSON.stringify(value);
      } else {
        acc[key] = String(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};

const client = async <
  TData = unknown,
  TError = unknown,
  TRequest = never,
  TQueryParams = unknown,
>(
  config: ClientConfig<TQueryParams> & { data?: TRequest },
): Promise<{ data: TData; error?: TError }> => {
  const fullUrl = new URL(`${import.meta.env.VITE_API_URL}${config.url}`);

  if (config.params) {
    const stringParams = stringifyParams(config.params);
    Object.entries(stringParams).forEach(([key, value]) => {
      fullUrl.searchParams.append(key, value);
    });
  }

  const response = await fetch(fullUrl, {
    method: config.method,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: config.data ? JSON.stringify(config.data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    return { data: undefined as TData, error };
  }

  const data = await response.json();
  return { data, error: undefined };
};

export default client;
