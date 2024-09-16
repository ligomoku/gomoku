// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-fetch';
import type { GetApiV1GameData, GetApiV1GameError, GetApiV1GameResponse, PostApiV1GameData, PostApiV1GameError, PostApiV1GameResponse, GetApiV1GameByGameIdData, GetApiV1GameByGameIdError, GetApiV1GameByGameIdResponse } from './types.gen';

export const client = createClient(createConfig());

export const getApiV1Game = <ThrowOnError extends boolean = false>(options?: Options<GetApiV1GameData, ThrowOnError>) => { return (options?.client ?? client).get<GetApiV1GameResponse, GetApiV1GameError, ThrowOnError>({
    ...options,
    url: '/api/v1/Game'
}); };

export const postApiV1Game = <ThrowOnError extends boolean = false>(options?: Options<PostApiV1GameData, ThrowOnError>) => { return (options?.client ?? client).post<PostApiV1GameResponse, PostApiV1GameError, ThrowOnError>({
    ...options,
    url: '/api/v1/Game'
}); };

export const getApiV1GameByGameId = <ThrowOnError extends boolean = false>(options: Options<GetApiV1GameByGameIdData, ThrowOnError>) => { return (options?.client ?? client).get<GetApiV1GameByGameIdResponse, GetApiV1GameByGameIdError, ThrowOnError>({
    ...options,
    url: '/api/v1/Game/{gameId}'
}); };