import * as SwaggerClient from "./client/api-client";
import * as SwaggerSchemas from "./client/schema";
import * as SignalClientMessages from "./hubs/GomokuServer.Api.Hubs.Messages.Client";
import * as SignalServerMessages from "./hubs/GomokuServer.Api.Hubs.Messages.Server";
import * as SignalDto from "./hubs/GomokuServer.Application.Games.Dto";
import * as SignalHubInterfaces from "./hubs/TypedSignalR.Client/GomokuServer.Api.Hubs.Interfaces";
import * as SignalRClientService from "./hubs/TypedSignalR.Client/index";

export {
  SwaggerClient,
  SwaggerSchemas,
  SignalDto,
  SignalClientMessages,
  SignalServerMessages,
  SignalHubInterfaces,
  SignalRClientService,
};
