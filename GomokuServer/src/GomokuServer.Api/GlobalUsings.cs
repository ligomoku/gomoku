global using System.ComponentModel.DataAnnotations;
global using System.Net.Mime;

global using Asp.Versioning;
global using Asp.Versioning.ApiExplorer;

global using GomokuServer.Api.Configuration;
global using GomokuServer.Api.Constants;
global using GomokuServer.Api.Controllers.v1.Requests;
global using GomokuServer.Api.Extensions;
global using GomokuServer.Api.Hubs;
global using GomokuServer.Api.Hubs.Interfaces;
global using GomokuServer.Api.Hubs.Messages.Client;
global using GomokuServer.Api.Hubs.Messages.Server;
global using GomokuServer.Api.Middlewares;
global using GomokuServer.Application.Games.Commands;
global using GomokuServer.Application.Games.Dto;
global using GomokuServer.Application.Games.Queries;
global using GomokuServer.Core.Common.Interfaces;
global using GomokuServer.Core.Common.Services;
global using GomokuServer.Infrastructure.Api;
global using GomokuServer.Infrastructure.Data;
global using GomokuServer.Infrastructure.Extensions;
global using GomokuServer.Utils.Extensions;

global using MediatR;

global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.AspNetCore.Cors;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.SignalR;
global using Microsoft.IdentityModel.Tokens;

global using Swashbuckle.AspNetCore.Filters;
