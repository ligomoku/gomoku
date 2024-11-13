// This file is auto-generated by @hey-api/openapi-ts

import type { Options } from "@hey-api/client-fetch";
import {
  queryOptions,
  infiniteQueryOptions,
  type InfiniteData,
  type UseMutationOptions,
  type DefaultError,
} from "@tanstack/react-query";
import type {
  GetApiGameAnonymousByGameIdHistoryData,
  GetApiGameAnonymousAvailableToJoinData,
  GetApiGameAnonymousAvailableToJoinError,
  GetApiGameAnonymousAvailableToJoinResponse,
  GetApiGameAnonymousActiveData,
  GetApiGameAnonymousActiveError,
  GetApiGameAnonymousActiveResponse,
  PostApiGameAnonymousData,
  PostApiGameAnonymousError,
  PostApiGameAnonymousResponse,
  PostApiGameAnonymousByGameIdJoinData,
  PostApiGameAnonymousByGameIdJoinError,
  PostApiGameAnonymousByGameIdJoinResponse,
  GetHealthData,
  GetApiProfilesByUserNameGamesData,
  GetApiProfilesByUserNameGamesError,
  GetApiProfilesByUserNameGamesResponse,
  GetApiGameRegisteredByGameIdHistoryData,
  GetApiGameRegisteredAvailableToJoinData,
  GetApiGameRegisteredAvailableToJoinError,
  GetApiGameRegisteredAvailableToJoinResponse,
  GetApiGameRegisteredActiveData,
  GetApiGameRegisteredActiveError,
  GetApiGameRegisteredActiveResponse,
  PostApiGameRegisteredData,
  PostApiGameRegisteredError,
  PostApiGameRegisteredResponse,
  PostApiGameRegisteredByGameIdJoinData,
  PostApiGameRegisteredByGameIdJoinError,
  PostApiGameRegisteredByGameIdJoinResponse,
  PostGamehubAnonymousJoinGameGroupData,
  PostGamehubAnonymousGetClockData,
  PostGamehubAnonymousMakeMoveData,
  PostGamehubAnonymousResignData,
  PostGamehubAnonymousRequestRematchData,
  PostGamehubAnonymousApproveRematchData,
  PostGamehubAnonymousSendMessageData,
  PostGamehubRegisteredJoinGameGroupData,
  PostGamehubRegisteredGetClockData,
  PostGamehubRegisteredMakeMoveData,
  PostGamehubRegisteredResignData,
  PostGamehubRegisteredRequestRematchData,
  PostGamehubRegisteredApproveRematchData,
  PostGamehubRegisteredSendMessageData,
} from "../types.gen";
import {
  client,
  getApiGameAnonymousByGameIdHistory,
  getApiGameAnonymousAvailableToJoin,
  getApiGameAnonymousActive,
  postApiGameAnonymous,
  postApiGameAnonymousByGameIdJoin,
  getHealth,
  getApiProfilesByUserNameGames,
  getApiGameRegisteredByGameIdHistory,
  getApiGameRegisteredAvailableToJoin,
  getApiGameRegisteredActive,
  postApiGameRegistered,
  postApiGameRegisteredByGameIdJoin,
  postGamehubAnonymousJoinGameGroup,
  postGamehubAnonymousGetClock,
  postGamehubAnonymousMakeMove,
  postGamehubAnonymousResign,
  postGamehubAnonymousRequestRematch,
  postGamehubAnonymousApproveRematch,
  postGamehubAnonymousSendMessage,
  postGamehubRegisteredJoinGameGroup,
  postGamehubRegisteredGetClock,
  postGamehubRegisteredMakeMove,
  postGamehubRegisteredResign,
  postGamehubRegisteredRequestRematch,
  postGamehubRegisteredApproveRematch,
  postGamehubRegisteredSendMessage,
} from "../services.gen";

type QueryKey<TOptions extends Options> = [
  Pick<TOptions, "baseUrl" | "body" | "headers" | "path" | "query"> & {
    _id: string;
    _infinite?: boolean;
  },
];

const createQueryKey = <TOptions extends Options>(
  id: string,
  options?: TOptions,
  infinite?: boolean,
): QueryKey<TOptions>[0] => {
  const params: QueryKey<TOptions>[0] = {
    _id: id,
    baseUrl: (options?.client ?? client).getConfig().baseUrl,
  } as QueryKey<TOptions>[0];
  if (infinite) {
    params._infinite = infinite;
  }
  if (options?.body) {
    params.body = options.body;
  }
  if (options?.headers) {
    params.headers = options.headers;
  }
  if (options?.path) {
    params.path = options.path;
  }
  if (options?.query) {
    params.query = options.query;
  }
  return params;
};

export const getApiGameAnonymousByGameIdHistoryQueryKey = (
  options: Options<GetApiGameAnonymousByGameIdHistoryData>,
) => [createQueryKey("getApiGameAnonymousByGameIdHistory", options)];

export const getApiGameAnonymousByGameIdHistoryOptions = (
  options: Options<GetApiGameAnonymousByGameIdHistoryData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getApiGameAnonymousByGameIdHistory({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getApiGameAnonymousByGameIdHistoryQueryKey(options),
  });
};

export const getApiGameAnonymousAvailableToJoinQueryKey = (
  options: Options<GetApiGameAnonymousAvailableToJoinData>,
) => [createQueryKey("getApiGameAnonymousAvailableToJoin", options)];

export const getApiGameAnonymousAvailableToJoinOptions = (
  options: Options<GetApiGameAnonymousAvailableToJoinData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getApiGameAnonymousAvailableToJoin({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getApiGameAnonymousAvailableToJoinQueryKey(options),
  });
};

const createInfiniteParams = <
  K extends Pick<QueryKey<Options>[0], "body" | "headers" | "path" | "query">,
>(
  queryKey: QueryKey<Options>,
  page: K,
) => {
  const params = queryKey[0];
  if (page.body) {
    params.body = {
      ...(queryKey[0].body as any),
      ...(page.body as any),
    };
  }
  if (page.headers) {
    params.headers = {
      ...queryKey[0].headers,
      ...page.headers,
    };
  }
  if (page.path) {
    params.path = {
      ...queryKey[0].path,
      ...page.path,
    };
  }
  if (page.query) {
    params.query = {
      ...queryKey[0].query,
      ...page.query,
    };
  }
  return params as unknown as typeof page;
};

export const getApiGameAnonymousAvailableToJoinInfiniteQueryKey = (
  options: Options<GetApiGameAnonymousAvailableToJoinData>,
): QueryKey<Options<GetApiGameAnonymousAvailableToJoinData>> => [
  createQueryKey("getApiGameAnonymousAvailableToJoin", options, true),
];

export const getApiGameAnonymousAvailableToJoinInfiniteOptions = (
  options: Options<GetApiGameAnonymousAvailableToJoinData>,
) => {
  return infiniteQueryOptions<
    GetApiGameAnonymousAvailableToJoinResponse,
    GetApiGameAnonymousAvailableToJoinError,
    InfiniteData<GetApiGameAnonymousAvailableToJoinResponse>,
    QueryKey<Options<GetApiGameAnonymousAvailableToJoinData>>,
    | number
    | Pick<
        QueryKey<Options<GetApiGameAnonymousAvailableToJoinData>>[0],
        "body" | "headers" | "path" | "query"
      >
  >(
    // @ts-ignore
    {
      queryFn: async ({ pageParam, queryKey, signal }) => {
        // @ts-ignore
        const page: Pick<
          QueryKey<Options<GetApiGameAnonymousAvailableToJoinData>>[0],
          "body" | "headers" | "path" | "query"
        > =
          typeof pageParam === "object"
            ? pageParam
            : {
                query: {
                  offset: pageParam,
                },
              };
        const params = createInfiniteParams(queryKey, page);
        const { data } = await getApiGameAnonymousAvailableToJoin({
          ...options,
          ...params,
          signal,
          throwOnError: true,
        });
        return data;
      },
      queryKey: getApiGameAnonymousAvailableToJoinInfiniteQueryKey(options),
    },
  );
};

export const getApiGameAnonymousActiveQueryKey = (
  options: Options<GetApiGameAnonymousActiveData>,
) => [createQueryKey("getApiGameAnonymousActive", options)];

export const getApiGameAnonymousActiveOptions = (
  options: Options<GetApiGameAnonymousActiveData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getApiGameAnonymousActive({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getApiGameAnonymousActiveQueryKey(options),
  });
};

export const getApiGameAnonymousActiveInfiniteQueryKey = (
  options: Options<GetApiGameAnonymousActiveData>,
): QueryKey<Options<GetApiGameAnonymousActiveData>> => [
  createQueryKey("getApiGameAnonymousActive", options, true),
];

export const getApiGameAnonymousActiveInfiniteOptions = (
  options: Options<GetApiGameAnonymousActiveData>,
) => {
  return infiniteQueryOptions<
    GetApiGameAnonymousActiveResponse,
    GetApiGameAnonymousActiveError,
    InfiniteData<GetApiGameAnonymousActiveResponse>,
    QueryKey<Options<GetApiGameAnonymousActiveData>>,
    | number
    | Pick<
        QueryKey<Options<GetApiGameAnonymousActiveData>>[0],
        "body" | "headers" | "path" | "query"
      >
  >(
    // @ts-ignore
    {
      queryFn: async ({ pageParam, queryKey, signal }) => {
        // @ts-ignore
        const page: Pick<
          QueryKey<Options<GetApiGameAnonymousActiveData>>[0],
          "body" | "headers" | "path" | "query"
        > =
          typeof pageParam === "object"
            ? pageParam
            : {
                query: {
                  offset: pageParam,
                },
              };
        const params = createInfiniteParams(queryKey, page);
        const { data } = await getApiGameAnonymousActive({
          ...options,
          ...params,
          signal,
          throwOnError: true,
        });
        return data;
      },
      queryKey: getApiGameAnonymousActiveInfiniteQueryKey(options),
    },
  );
};

export const postApiGameAnonymousQueryKey = (
  options: Options<PostApiGameAnonymousData>,
) => [createQueryKey("postApiGameAnonymous", options)];

export const postApiGameAnonymousOptions = (
  options: Options<PostApiGameAnonymousData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postApiGameAnonymous({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postApiGameAnonymousQueryKey(options),
  });
};

export const postApiGameAnonymousMutation = (
  options?: Partial<Options<PostApiGameAnonymousData>>,
) => {
  const mutationOptions: UseMutationOptions<
    PostApiGameAnonymousResponse,
    PostApiGameAnonymousError,
    Options<PostApiGameAnonymousData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postApiGameAnonymous({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postApiGameAnonymousByGameIdJoinQueryKey = (
  options: Options<PostApiGameAnonymousByGameIdJoinData>,
) => [createQueryKey("postApiGameAnonymousByGameIdJoin", options)];

export const postApiGameAnonymousByGameIdJoinOptions = (
  options: Options<PostApiGameAnonymousByGameIdJoinData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postApiGameAnonymousByGameIdJoin({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postApiGameAnonymousByGameIdJoinQueryKey(options),
  });
};

export const postApiGameAnonymousByGameIdJoinMutation = (
  options?: Partial<Options<PostApiGameAnonymousByGameIdJoinData>>,
) => {
  const mutationOptions: UseMutationOptions<
    PostApiGameAnonymousByGameIdJoinResponse,
    PostApiGameAnonymousByGameIdJoinError,
    Options<PostApiGameAnonymousByGameIdJoinData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postApiGameAnonymousByGameIdJoin({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getHealthQueryKey = (options: Options<GetHealthData>) => [
  createQueryKey("getHealth", options),
];

export const getHealthOptions = (options: Options<GetHealthData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getHealth({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getHealthQueryKey(options),
  });
};

export const getApiProfilesByUserNameGamesQueryKey = (
  options: Options<GetApiProfilesByUserNameGamesData>,
) => [createQueryKey("getApiProfilesByUserNameGames", options)];

export const getApiProfilesByUserNameGamesOptions = (
  options: Options<GetApiProfilesByUserNameGamesData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getApiProfilesByUserNameGames({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getApiProfilesByUserNameGamesQueryKey(options),
  });
};

export const getApiProfilesByUserNameGamesInfiniteQueryKey = (
  options: Options<GetApiProfilesByUserNameGamesData>,
): QueryKey<Options<GetApiProfilesByUserNameGamesData>> => [
  createQueryKey("getApiProfilesByUserNameGames", options, true),
];

export const getApiProfilesByUserNameGamesInfiniteOptions = (
  options: Options<GetApiProfilesByUserNameGamesData>,
) => {
  return infiniteQueryOptions<
    GetApiProfilesByUserNameGamesResponse,
    GetApiProfilesByUserNameGamesError,
    InfiniteData<GetApiProfilesByUserNameGamesResponse>,
    QueryKey<Options<GetApiProfilesByUserNameGamesData>>,
    | number
    | Pick<
        QueryKey<Options<GetApiProfilesByUserNameGamesData>>[0],
        "body" | "headers" | "path" | "query"
      >
  >(
    // @ts-ignore
    {
      queryFn: async ({ pageParam, queryKey, signal }) => {
        // @ts-ignore
        const page: Pick<
          QueryKey<Options<GetApiProfilesByUserNameGamesData>>[0],
          "body" | "headers" | "path" | "query"
        > =
          typeof pageParam === "object"
            ? pageParam
            : {
                query: {
                  offset: pageParam,
                },
              };
        const params = createInfiniteParams(queryKey, page);
        const { data } = await getApiProfilesByUserNameGames({
          ...options,
          ...params,
          signal,
          throwOnError: true,
        });
        return data;
      },
      queryKey: getApiProfilesByUserNameGamesInfiniteQueryKey(options),
    },
  );
};

export const getApiGameRegisteredByGameIdHistoryQueryKey = (
  options: Options<GetApiGameRegisteredByGameIdHistoryData>,
) => [createQueryKey("getApiGameRegisteredByGameIdHistory", options)];

export const getApiGameRegisteredByGameIdHistoryOptions = (
  options: Options<GetApiGameRegisteredByGameIdHistoryData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getApiGameRegisteredByGameIdHistory({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getApiGameRegisteredByGameIdHistoryQueryKey(options),
  });
};

export const getApiGameRegisteredAvailableToJoinQueryKey = (
  options: Options<GetApiGameRegisteredAvailableToJoinData>,
) => [createQueryKey("getApiGameRegisteredAvailableToJoin", options)];

export const getApiGameRegisteredAvailableToJoinOptions = (
  options: Options<GetApiGameRegisteredAvailableToJoinData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getApiGameRegisteredAvailableToJoin({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getApiGameRegisteredAvailableToJoinQueryKey(options),
  });
};

export const getApiGameRegisteredAvailableToJoinInfiniteQueryKey = (
  options: Options<GetApiGameRegisteredAvailableToJoinData>,
): QueryKey<Options<GetApiGameRegisteredAvailableToJoinData>> => [
  createQueryKey("getApiGameRegisteredAvailableToJoin", options, true),
];

export const getApiGameRegisteredAvailableToJoinInfiniteOptions = (
  options: Options<GetApiGameRegisteredAvailableToJoinData>,
) => {
  return infiniteQueryOptions<
    GetApiGameRegisteredAvailableToJoinResponse,
    GetApiGameRegisteredAvailableToJoinError,
    InfiniteData<GetApiGameRegisteredAvailableToJoinResponse>,
    QueryKey<Options<GetApiGameRegisteredAvailableToJoinData>>,
    | number
    | Pick<
        QueryKey<Options<GetApiGameRegisteredAvailableToJoinData>>[0],
        "body" | "headers" | "path" | "query"
      >
  >(
    // @ts-ignore
    {
      queryFn: async ({ pageParam, queryKey, signal }) => {
        // @ts-ignore
        const page: Pick<
          QueryKey<Options<GetApiGameRegisteredAvailableToJoinData>>[0],
          "body" | "headers" | "path" | "query"
        > =
          typeof pageParam === "object"
            ? pageParam
            : {
                query: {
                  offset: pageParam,
                },
              };
        const params = createInfiniteParams(queryKey, page);
        const { data } = await getApiGameRegisteredAvailableToJoin({
          ...options,
          ...params,
          signal,
          throwOnError: true,
        });
        return data;
      },
      queryKey: getApiGameRegisteredAvailableToJoinInfiniteQueryKey(options),
    },
  );
};

export const getApiGameRegisteredActiveQueryKey = (
  options: Options<GetApiGameRegisteredActiveData>,
) => [createQueryKey("getApiGameRegisteredActive", options)];

export const getApiGameRegisteredActiveOptions = (
  options: Options<GetApiGameRegisteredActiveData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getApiGameRegisteredActive({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getApiGameRegisteredActiveQueryKey(options),
  });
};

export const getApiGameRegisteredActiveInfiniteQueryKey = (
  options: Options<GetApiGameRegisteredActiveData>,
): QueryKey<Options<GetApiGameRegisteredActiveData>> => [
  createQueryKey("getApiGameRegisteredActive", options, true),
];

export const getApiGameRegisteredActiveInfiniteOptions = (
  options: Options<GetApiGameRegisteredActiveData>,
) => {
  return infiniteQueryOptions<
    GetApiGameRegisteredActiveResponse,
    GetApiGameRegisteredActiveError,
    InfiniteData<GetApiGameRegisteredActiveResponse>,
    QueryKey<Options<GetApiGameRegisteredActiveData>>,
    | number
    | Pick<
        QueryKey<Options<GetApiGameRegisteredActiveData>>[0],
        "body" | "headers" | "path" | "query"
      >
  >(
    // @ts-ignore
    {
      queryFn: async ({ pageParam, queryKey, signal }) => {
        // @ts-ignore
        const page: Pick<
          QueryKey<Options<GetApiGameRegisteredActiveData>>[0],
          "body" | "headers" | "path" | "query"
        > =
          typeof pageParam === "object"
            ? pageParam
            : {
                query: {
                  offset: pageParam,
                },
              };
        const params = createInfiniteParams(queryKey, page);
        const { data } = await getApiGameRegisteredActive({
          ...options,
          ...params,
          signal,
          throwOnError: true,
        });
        return data;
      },
      queryKey: getApiGameRegisteredActiveInfiniteQueryKey(options),
    },
  );
};

export const postApiGameRegisteredQueryKey = (
  options: Options<PostApiGameRegisteredData>,
) => [createQueryKey("postApiGameRegistered", options)];

export const postApiGameRegisteredOptions = (
  options: Options<PostApiGameRegisteredData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postApiGameRegistered({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postApiGameRegisteredQueryKey(options),
  });
};

export const postApiGameRegisteredMutation = (
  options?: Partial<Options<PostApiGameRegisteredData>>,
) => {
  const mutationOptions: UseMutationOptions<
    PostApiGameRegisteredResponse,
    PostApiGameRegisteredError,
    Options<PostApiGameRegisteredData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postApiGameRegistered({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postApiGameRegisteredByGameIdJoinQueryKey = (
  options: Options<PostApiGameRegisteredByGameIdJoinData>,
) => [createQueryKey("postApiGameRegisteredByGameIdJoin", options)];

export const postApiGameRegisteredByGameIdJoinOptions = (
  options: Options<PostApiGameRegisteredByGameIdJoinData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postApiGameRegisteredByGameIdJoin({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postApiGameRegisteredByGameIdJoinQueryKey(options),
  });
};

export const postApiGameRegisteredByGameIdJoinMutation = (
  options?: Partial<Options<PostApiGameRegisteredByGameIdJoinData>>,
) => {
  const mutationOptions: UseMutationOptions<
    PostApiGameRegisteredByGameIdJoinResponse,
    PostApiGameRegisteredByGameIdJoinError,
    Options<PostApiGameRegisteredByGameIdJoinData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postApiGameRegisteredByGameIdJoin({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubAnonymousJoinGameGroupQueryKey = (
  options?: Options<PostGamehubAnonymousJoinGameGroupData>,
) => [createQueryKey("postGamehubAnonymousJoinGameGroup", options)];

export const postGamehubAnonymousJoinGameGroupOptions = (
  options?: Options<PostGamehubAnonymousJoinGameGroupData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubAnonymousJoinGameGroup({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubAnonymousJoinGameGroupQueryKey(options),
  });
};

export const postGamehubAnonymousJoinGameGroupMutation = (
  options?: Partial<Options<PostGamehubAnonymousJoinGameGroupData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubAnonymousJoinGameGroupData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubAnonymousJoinGameGroup({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubAnonymousGetClockQueryKey = (
  options?: Options<PostGamehubAnonymousGetClockData>,
) => [createQueryKey("postGamehubAnonymousGetClock", options)];

export const postGamehubAnonymousGetClockOptions = (
  options?: Options<PostGamehubAnonymousGetClockData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubAnonymousGetClock({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubAnonymousGetClockQueryKey(options),
  });
};

export const postGamehubAnonymousGetClockMutation = (
  options?: Partial<Options<PostGamehubAnonymousGetClockData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubAnonymousGetClockData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubAnonymousGetClock({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubAnonymousMakeMoveQueryKey = (
  options?: Options<PostGamehubAnonymousMakeMoveData>,
) => [createQueryKey("postGamehubAnonymousMakeMove", options)];

export const postGamehubAnonymousMakeMoveOptions = (
  options?: Options<PostGamehubAnonymousMakeMoveData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubAnonymousMakeMove({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubAnonymousMakeMoveQueryKey(options),
  });
};

export const postGamehubAnonymousMakeMoveMutation = (
  options?: Partial<Options<PostGamehubAnonymousMakeMoveData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubAnonymousMakeMoveData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubAnonymousMakeMove({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubAnonymousResignQueryKey = (
  options?: Options<PostGamehubAnonymousResignData>,
) => [createQueryKey("postGamehubAnonymousResign", options)];

export const postGamehubAnonymousResignOptions = (
  options?: Options<PostGamehubAnonymousResignData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubAnonymousResign({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubAnonymousResignQueryKey(options),
  });
};

export const postGamehubAnonymousResignMutation = (
  options?: Partial<Options<PostGamehubAnonymousResignData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubAnonymousResignData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubAnonymousResign({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubAnonymousRequestRematchQueryKey = (
  options?: Options<PostGamehubAnonymousRequestRematchData>,
) => [createQueryKey("postGamehubAnonymousRequestRematch", options)];

export const postGamehubAnonymousRequestRematchOptions = (
  options?: Options<PostGamehubAnonymousRequestRematchData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubAnonymousRequestRematch({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubAnonymousRequestRematchQueryKey(options),
  });
};

export const postGamehubAnonymousRequestRematchMutation = (
  options?: Partial<Options<PostGamehubAnonymousRequestRematchData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubAnonymousRequestRematchData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubAnonymousRequestRematch({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubAnonymousApproveRematchQueryKey = (
  options?: Options<PostGamehubAnonymousApproveRematchData>,
) => [createQueryKey("postGamehubAnonymousApproveRematch", options)];

export const postGamehubAnonymousApproveRematchOptions = (
  options?: Options<PostGamehubAnonymousApproveRematchData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubAnonymousApproveRematch({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubAnonymousApproveRematchQueryKey(options),
  });
};

export const postGamehubAnonymousApproveRematchMutation = (
  options?: Partial<Options<PostGamehubAnonymousApproveRematchData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubAnonymousApproveRematchData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubAnonymousApproveRematch({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubAnonymousSendMessageQueryKey = (
  options?: Options<PostGamehubAnonymousSendMessageData>,
) => [createQueryKey("postGamehubAnonymousSendMessage", options)];

export const postGamehubAnonymousSendMessageOptions = (
  options?: Options<PostGamehubAnonymousSendMessageData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubAnonymousSendMessage({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubAnonymousSendMessageQueryKey(options),
  });
};

export const postGamehubAnonymousSendMessageMutation = (
  options?: Partial<Options<PostGamehubAnonymousSendMessageData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubAnonymousSendMessageData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubAnonymousSendMessage({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubRegisteredJoinGameGroupQueryKey = (
  options?: Options<PostGamehubRegisteredJoinGameGroupData>,
) => [createQueryKey("postGamehubRegisteredJoinGameGroup", options)];

export const postGamehubRegisteredJoinGameGroupOptions = (
  options?: Options<PostGamehubRegisteredJoinGameGroupData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubRegisteredJoinGameGroup({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubRegisteredJoinGameGroupQueryKey(options),
  });
};

export const postGamehubRegisteredJoinGameGroupMutation = (
  options?: Partial<Options<PostGamehubRegisteredJoinGameGroupData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubRegisteredJoinGameGroupData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubRegisteredJoinGameGroup({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubRegisteredGetClockQueryKey = (
  options?: Options<PostGamehubRegisteredGetClockData>,
) => [createQueryKey("postGamehubRegisteredGetClock", options)];

export const postGamehubRegisteredGetClockOptions = (
  options?: Options<PostGamehubRegisteredGetClockData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubRegisteredGetClock({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubRegisteredGetClockQueryKey(options),
  });
};

export const postGamehubRegisteredGetClockMutation = (
  options?: Partial<Options<PostGamehubRegisteredGetClockData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubRegisteredGetClockData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubRegisteredGetClock({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubRegisteredMakeMoveQueryKey = (
  options?: Options<PostGamehubRegisteredMakeMoveData>,
) => [createQueryKey("postGamehubRegisteredMakeMove", options)];

export const postGamehubRegisteredMakeMoveOptions = (
  options?: Options<PostGamehubRegisteredMakeMoveData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubRegisteredMakeMove({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubRegisteredMakeMoveQueryKey(options),
  });
};

export const postGamehubRegisteredMakeMoveMutation = (
  options?: Partial<Options<PostGamehubRegisteredMakeMoveData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubRegisteredMakeMoveData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubRegisteredMakeMove({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubRegisteredResignQueryKey = (
  options?: Options<PostGamehubRegisteredResignData>,
) => [createQueryKey("postGamehubRegisteredResign", options)];

export const postGamehubRegisteredResignOptions = (
  options?: Options<PostGamehubRegisteredResignData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubRegisteredResign({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubRegisteredResignQueryKey(options),
  });
};

export const postGamehubRegisteredResignMutation = (
  options?: Partial<Options<PostGamehubRegisteredResignData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubRegisteredResignData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubRegisteredResign({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubRegisteredRequestRematchQueryKey = (
  options?: Options<PostGamehubRegisteredRequestRematchData>,
) => [createQueryKey("postGamehubRegisteredRequestRematch", options)];

export const postGamehubRegisteredRequestRematchOptions = (
  options?: Options<PostGamehubRegisteredRequestRematchData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubRegisteredRequestRematch({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubRegisteredRequestRematchQueryKey(options),
  });
};

export const postGamehubRegisteredRequestRematchMutation = (
  options?: Partial<Options<PostGamehubRegisteredRequestRematchData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubRegisteredRequestRematchData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubRegisteredRequestRematch({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubRegisteredApproveRematchQueryKey = (
  options?: Options<PostGamehubRegisteredApproveRematchData>,
) => [createQueryKey("postGamehubRegisteredApproveRematch", options)];

export const postGamehubRegisteredApproveRematchOptions = (
  options?: Options<PostGamehubRegisteredApproveRematchData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubRegisteredApproveRematch({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubRegisteredApproveRematchQueryKey(options),
  });
};

export const postGamehubRegisteredApproveRematchMutation = (
  options?: Partial<Options<PostGamehubRegisteredApproveRematchData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubRegisteredApproveRematchData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubRegisteredApproveRematch({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const postGamehubRegisteredSendMessageQueryKey = (
  options?: Options<PostGamehubRegisteredSendMessageData>,
) => [createQueryKey("postGamehubRegisteredSendMessage", options)];

export const postGamehubRegisteredSendMessageOptions = (
  options?: Options<PostGamehubRegisteredSendMessageData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await postGamehubRegisteredSendMessage({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: postGamehubRegisteredSendMessageQueryKey(options),
  });
};

export const postGamehubRegisteredSendMessageMutation = (
  options?: Partial<Options<PostGamehubRegisteredSendMessageData>>,
) => {
  const mutationOptions: UseMutationOptions<
    void,
    DefaultError,
    Options<PostGamehubRegisteredSendMessageData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await postGamehubRegisteredSendMessage({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};
