import * as SwaggerHooks from "./client/hooks"; // Сгенерированные хуки React Query
import * as SwaggerSchemas from "./client/schemas"; // Схемы из OpenAPI
import * as SwaggerTypes from "./client/types"; // Типы данных (зависит от настройки)

import * as SignalClientMessages from "./hubs/GomokuServer.Api.Hubs.Messages.Client";
import * as SignalServerMessages from "./hubs/GomokuServer.Api.Hubs.Messages.Server";
import * as SignalDto from "./hubs/GomokuServer.Application.Games.Dto";
import * as SignalHubInterfaces from "./hubs/TypedSignalR.Client/GomokuServer.Api.Hubs.Interfaces";
import * as SignalRClientService from "./hubs/TypedSignalR.Client/index";

export {
  SwaggerHooks,
  SwaggerSchemas,
  SwaggerTypes,
  SignalDto,
  SignalClientMessages,
  SignalServerMessages,
  SignalHubInterfaces,
  SignalRClientService,
};
