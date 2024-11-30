import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./schema";

export const createApiClient = (baseUrl: string) => {
  const fetchClient = createFetchClient<paths>({
    baseUrl,
  });

  return createClient(fetchClient);
};

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("Missing API Base URL");
}

export const apiClient = createApiClient(API_BASE_URL);
