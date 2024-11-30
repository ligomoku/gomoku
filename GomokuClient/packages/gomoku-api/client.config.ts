export const ClientConfig = {
  baseURL: "",
  headers: {} as Record<string, string>,
};

export const setAuthToken = (token: string) => {
  ClientConfig.headers.Authorization = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete ClientConfig.headers.Authorization;
};

export const client = {
  async request<T>({
    url,
    method,
    headers,
    ...config
  }: RequestInit & { url: string }): Promise<T> {
    const response = await fetch(`${ClientConfig.baseURL}${url}`, {
      method,
      headers: {
        ...headers,
        ...ClientConfig.headers,
      },
      ...config,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};

export default client;
