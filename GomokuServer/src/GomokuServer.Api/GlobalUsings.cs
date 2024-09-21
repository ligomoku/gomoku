global using System.IdentityModel.Tokens.Jwt;

global using Asp.Versioning;
global using Asp.Versioning.ApiExplorer;

global using GomokuServer.Api.Configuration;
global using GomokuServer.Api.Constants;
global using GomokuServer.Api.Controllers.v2.Requests;
global using GomokuServer.Api.Examples;
global using GomokuServer.Api.Extensions;
global using GomokuServer.Api.Hubs;
global using GomokuServer.Api.Middlewares;
global using GomokuServer.Application;
global using GomokuServer.Application.Interfaces;
global using GomokuServer.Application.Responses;
global using GomokuServer.Core.Interfaces;
global using GomokuServer.Core.Services;
global using GomokuServer.Infrastructure.Api;
global using GomokuServer.Infrastructure.Data;
global using GomokuServer.Infrastructure.Extensions;

global using Microsoft.AspNetCore.Cors;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.IdentityModel.Tokens;

global using Swashbuckle.AspNetCore.Filters;
