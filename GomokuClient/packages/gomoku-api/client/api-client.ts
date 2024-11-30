
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./schema";

const fetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:62411",
});

export const apiClient = createClient(fetchClient);
