using System.Net.Http.Headers;

using GomokuServer.Api.Hubs.Providers;
using GomokuServer.Api.Swagger.Examples;
using GomokuServer.Api.Swagger.Filters;
using GomokuServer.Application.Interfaces.Common;

using Microsoft.OpenApi.Models;

namespace GomokuServer.Api.Extensions;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection RegisterSwagger(this IServiceCollection services)
	{
		services.AddSwaggerExamplesFromAssemblyOf<NotFoundErrorExample>();
		services.AddEndpointsApiExplorer();
		services.AddSwaggerGen(options =>
		{
			var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

			foreach (var description in provider.ApiVersionDescriptions)
			{
				options.SwaggerDoc(description.GroupName, new OpenApiInfo
				{
					Title = $"Gomoku API v{description.ApiVersion}",
					Version = description.ApiVersion.ToString(),
					Description = description.IsDeprecated ? "This API version is deprecated" : string.Empty
				});
			}

			var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
			var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
			options.IncludeXmlComments(xmlPath);

			options.ExampleFilters();

			options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
			{
				Name = "Authorization",
				Type = SecuritySchemeType.Http,
				Scheme = "Bearer",
				BearerFormat = "JWT",
				In = ParameterLocation.Header,
				Description = "Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\""
			});

			options.OperationFilter<LowerCaseParametersOperationFilter>();
			options.OperationFilter<AuthorizationOperationFilter>();
			options.OperationFilter<MandatoryHeadersParametersOperationFilter>();

			options.AddSignalRSwaggerGen();
		});

		return services;
	}

	public static IServiceCollection RegisterApiVersioning(this IServiceCollection services)
	{
		services.AddApiVersioning(options =>
		{
			options.DefaultApiVersion = new ApiVersion(1, 0);
			options.AssumeDefaultVersionWhenUnspecified = true;
			options.ReportApiVersions = true;
			options.ApiVersionReader = new HeaderApiVersionReader("X-Version");
		}).AddApiExplorer(options =>
		{
			options.GroupNameFormat = "'v'VVV";
			options.SubstituteApiVersionInUrl = true;
		});

		return services;
	}

	public static IServiceCollection RegisterCors(this IServiceCollection services, string corsPolicyName, Config config)
	{
		services.AddCors(options =>
		{
			options.AddPolicy(corsPolicyName, policyBuilder => policyBuilder
				.WithOrigins(config.GomokuClient.BaseUrl)
				.WithMethods("GET", "POST", "PUT", "DELETE")
				.AllowAnyHeader()
				.AllowCredentials());
		});

		return services;
	}

	public static IServiceCollection RegisterSignalR(this IServiceCollection services)
	{
		services
			.AddSignalR()
			.AddJsonProtocol();
		services.AddSingleton<IUserIdProvider, UserIdFromJwtProvider>();

		return services;
	}

	public static IServiceCollection RegisterAuthentication(this IServiceCollection services)
	{
		services.AddAuthentication(options =>
		{
			options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		})
		.AddJwtBearer(async options =>
		{
			var serviceProvider = services.BuildServiceProvider();
			var clerkFrontendApi = serviceProvider.GetRequiredService<IClerkFrontendApi>();
			var clerkJwksJson = await clerkFrontendApi.GetJwks();
			var jwks = new JsonWebKeySet(clerkJwksJson);

			options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = false,
				ValidateAudience = false,
				ValidateIssuerSigningKey = true,
				IssuerSigningKeys = jwks.GetSigningKeys(),
				ValidateLifetime = true
			};

			// This is important for SignalR: handle tokens from the query string (access_token)
			options.Events = new JwtBearerEvents
			{
				OnMessageReceived = context =>
				{
					var accessToken = context.Request.Query["access_token"];

					var path = context.HttpContext.Request.Path;
					if (!string.IsNullOrEmpty(accessToken))
					{
						context.Token = accessToken;
					}

					return Task.CompletedTask;
				}
			};
		});

		return services;
	}

	public static IServiceCollection RegisterGomokuServices(this IServiceCollection services, Config config)
	{
		services.AddSingleton<IRandomProvider, RandomProvider>();
		services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
		services.AddSingleton<IGameRepository, InMemoryGameRepository>();
		services.AddSingleton<IProfilesRepository, ClerkProfilesRepository>();
		services.RegisterCommandsAndQueries();

		services.AddRefitHttpClient<IClerkFrontendApi>((_, httpClient) =>
		{
			httpClient.BaseAddress = new Uri(config.Clerk.FrontendApiBaseUrl);
		});
		services.AddRefitHttpClient<IClerkBackendApi>((_, httpClient) =>
		{
			httpClient.BaseAddress = new Uri(config.Clerk.BackendApiBaseUrl);
			httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", config.Clerk.BackendApiSecret);
		});

		return services;
	}

	private static IServiceCollection RegisterCommandsAndQueries(this IServiceCollection services)
	{
		services.AddMediatR(config =>
		{
			config.RegisterServicesFromAssembly(typeof(IQuery<>).Assembly);
		});

		return services;
	}
}
