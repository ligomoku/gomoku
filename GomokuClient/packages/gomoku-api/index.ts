import * as SwaggerServices from "./client/sdk.gen";
import * as SwaggerTransformers from "./client/transformers.gen";
import * as SwaggerTypes from "./client/types.gen";
import * as SignalClientMessages from "./hubs/GomokuServer.Api.Hubs.Messages.Client";
import * as SignalServerMessages from "./hubs/GomokuServer.Api.Hubs.Messages.Server";
import * as SignalDto from "./hubs/GomokuServer.Application.Games.Dto";
import * as SignalHubInterfaces from "./hubs/TypedSignalR.Client/GomokuServer.Api.Hubs.Interfaces";
import * as SignalRClientService from "./hubs/TypedSignalR.Client/index";

export {
  SwaggerTypes,
  SwaggerTransformers,
  SwaggerServices,
  SignalDto,
  SignalClientMessages,
  SignalServerMessages,
  SignalHubInterfaces,
  SignalRClientService,
};
