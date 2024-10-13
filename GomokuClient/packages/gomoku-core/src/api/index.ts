import * as SwaggerTypes from "./client/types.gen";
import * as SwaggerServices from "./client/services.gen";
import * as SwaggerSchemas from "./client/schemas.gen";

import * as SignalDto from "./hubs/GomokuServer.Application.Games.Dto";
import * as SignalClientMessages from "./hubs/GomokuServer.Api.Hubs.Messages.Client";
import * as SignalServerMessages from "./hubs/GomokuServer.Api.Hubs.Messages.Server";
import * as SignalHubInterfaces from "./hubs/TypedSignalR.Client/GomokuServer.Api.Hubs.Interfaces";
import * as SignalRClientService from "./hubs/TypedSignalR.Client/index";

export {
  SwaggerTypes,
  SwaggerServices,
  SwaggerSchemas,
  SignalDto,
  SignalClientMessages,
  SignalServerMessages,
  SignalHubInterfaces,
  SignalRClientService,
};
