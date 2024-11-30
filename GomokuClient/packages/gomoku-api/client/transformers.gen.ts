// This file is auto-generated by @hey-api/openapi-ts

import type {
  GetApiGameAnonymousByGameIdHistoryResponse,
  GetApiGameAnonymousAvailableToJoinResponse,
  GetApiGameAnonymousActiveResponse,
  PostApiGameAnonymousResponse,
  PostApiGameAnonymousByGameIdJoinResponse,
  GetApiProfilesByUserNameGamesResponse,
  GetApiGameRegisteredByGameIdHistoryResponse,
  GetApiGameRegisteredAvailableToJoinResponse,
  GetApiGameRegisteredActiveResponse,
  PostApiGameRegisteredResponse,
  PostApiGameRegisteredByGameIdJoinResponse,
} from "./types.gen";

const playerDtoSchemaResponseTransformer = (data: any) => {
  return data;
};

const playersDtoSchemaResponseTransformer = (data: any) => {
  if (data.black) {
    data.black = playerDtoSchemaResponseTransformer(data.black);
  }
  if (data.white) {
    data.white = playerDtoSchemaResponseTransformer(data.white);
  }
  return data;
};

const tileDtoSchemaResponseTransformer = (data: any) => {
  return data;
};

const timeControlDtoSchemaResponseTransformer = (data: any) => {
  return data;
};

const clockDtoSchemaResponseTransformer = (data: any) => {
  return data;
};

const getGameHistoryResponseSchemaResponseTransformer = (data: any) => {
  data.players = playersDtoSchemaResponseTransformer(data.players);
  if (data.winningSequence) {
    data.winningSequence = data.winningSequence.map((item: any) => {
      return tileDtoSchemaResponseTransformer(item);
    });
  }
  return data.movesHistory;
  if (data.timeControl) {
    data.timeControl = timeControlDtoSchemaResponseTransformer(
      data.timeControl,
    );
  }
  if (data.clock) {
    data.clock = clockDtoSchemaResponseTransformer(data.clock);
  }
  return data;
};

export const getApiGameAnonymousByGameIdHistoryResponseTransformer = async (
  data: any,
): Promise<GetApiGameAnonymousByGameIdHistoryResponse> => {
  data = getGameHistoryResponseSchemaResponseTransformer(data);
  return data;
};

const profileDtoSchemaResponseTransformer = (data: any) => {
  return data;
};

const getAvailableGamesResponseSchemaResponseTransformer = (data: any) => {
  if (data.opponent) {
    data.opponent = profileDtoSchemaResponseTransformer(data.opponent);
  }
  if (data.timeControl) {
    data.timeControl = timeControlDtoSchemaResponseTransformer(
      data.timeControl,
    );
  }
  return data;
};

const paginationMetadataSchemaResponseTransformer = (data: any) => {
  return data;
};

const getAvailableGamesResponseIenumerablePaginatedResponseSchemaResponseTransformer =
  (data: any) => {
    data.data = data.data.map((item: any) => {
      return getAvailableGamesResponseSchemaResponseTransformer(item);
    });
    data.metadata = paginationMetadataSchemaResponseTransformer(data.metadata);
    return data;
  };

export const getApiGameAnonymousAvailableToJoinResponseTransformer = async (
  data: any,
): Promise<GetApiGameAnonymousAvailableToJoinResponse> => {
  data =
    getAvailableGamesResponseIenumerablePaginatedResponseSchemaResponseTransformer(
      data,
    );
  return data;
};

const getActiveGamesResponseSchemaResponseTransformer = (data: any) => {
  if (data.players) {
    data.players = playersDtoSchemaResponseTransformer(data.players);
  }
  if (data.timeControl) {
    data.timeControl = timeControlDtoSchemaResponseTransformer(
      data.timeControl,
    );
  }
  return data;
};

const getActiveGamesResponseIenumerablePaginatedResponseSchemaResponseTransformer =
  (data: any) => {
    data.data = data.data.map((item: any) => {
      return getActiveGamesResponseSchemaResponseTransformer(item);
    });
    data.metadata = paginationMetadataSchemaResponseTransformer(data.metadata);
    return data;
  };

export const getApiGameAnonymousActiveResponseTransformer = async (
  data: any,
): Promise<GetApiGameAnonymousActiveResponse> => {
  data =
    getActiveGamesResponseIenumerablePaginatedResponseSchemaResponseTransformer(
      data,
    );
  return data;
};

const createGameResponseSchemaResponseTransformer = (data: any) => {
  return data;
};

export const postApiGameAnonymousResponseTransformer = async (
  data: any,
): Promise<PostApiGameAnonymousResponse> => {
  data = createGameResponseSchemaResponseTransformer(data);
  return data;
};

const addPlayerToGameResponseSchemaResponseTransformer = (data: any) => {
  return data;
};

export const postApiGameAnonymousByGameIdJoinResponseTransformer = async (
  data: any,
): Promise<PostApiGameAnonymousByGameIdJoinResponse> => {
  data = addPlayerToGameResponseSchemaResponseTransformer(data);
  return data;
};

const usernamesDtoSchemaResponseTransformer = (data: any) => {
  return data;
};

const getGamesByUsernameResponseSchemaResponseTransformer = (data: any) => {
  data.players = usernamesDtoSchemaResponseTransformer(data.players);
  data.date = new Date(data.date);
  if (data.timeControl) {
    data.timeControl = timeControlDtoSchemaResponseTransformer(
      data.timeControl,
    );
  }
  if (data.clock) {
    data.clock = clockDtoSchemaResponseTransformer(data.clock);
  }
  return data;
};

const getGamesByUsernameResponseIenumerablePaginatedResponseSchemaResponseTransformer =
  (data: any) => {
    data.data = data.data.map((item: any) => {
      return getGamesByUsernameResponseSchemaResponseTransformer(item);
    });
    data.metadata = paginationMetadataSchemaResponseTransformer(data.metadata);
    return data;
  };

export const getApiProfilesByUserNameGamesResponseTransformer = async (
  data: any,
): Promise<GetApiProfilesByUserNameGamesResponse> => {
  data =
    getGamesByUsernameResponseIenumerablePaginatedResponseSchemaResponseTransformer(
      data,
    );
  return data;
};

export const getApiGameRegisteredByGameIdHistoryResponseTransformer = async (
  data: any,
): Promise<GetApiGameRegisteredByGameIdHistoryResponse> => {
  data = getGameHistoryResponseSchemaResponseTransformer(data);
  return data;
};

export const getApiGameRegisteredAvailableToJoinResponseTransformer = async (
  data: any,
): Promise<GetApiGameRegisteredAvailableToJoinResponse> => {
  data =
    getAvailableGamesResponseIenumerablePaginatedResponseSchemaResponseTransformer(
      data,
    );
  return data;
};

export const getApiGameRegisteredActiveResponseTransformer = async (
  data: any,
): Promise<GetApiGameRegisteredActiveResponse> => {
  data =
    getActiveGamesResponseIenumerablePaginatedResponseSchemaResponseTransformer(
      data,
    );
  return data;
};

export const postApiGameRegisteredResponseTransformer = async (
  data: any,
): Promise<PostApiGameRegisteredResponse> => {
  data = createGameResponseSchemaResponseTransformer(data);
  return data;
};

export const postApiGameRegisteredByGameIdJoinResponseTransformer = async (
  data: any,
): Promise<PostApiGameRegisteredByGameIdJoinResponse> => {
  data = addPlayerToGameResponseSchemaResponseTransformer(data);
  return data;
};
