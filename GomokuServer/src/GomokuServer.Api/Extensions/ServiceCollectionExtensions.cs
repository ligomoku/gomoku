using GomokuServer.Api.Attributes;

using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

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
				options.SwaggerDoc(description.GroupName, new Microsoft.OpenApi.Models.OpenApiInfo
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

			options.AddSecurityRequirement(new OpenApiSecurityRequirement
			{
				{
					new OpenApiSecurityScheme
					{
						Reference = new OpenApiReference
						{
							Type = ReferenceType.SecurityScheme,
							Id = "Bearer"
						}
					},
					Array.Empty<string>()
				}
			});

			options.OperationFilter<AddRequiredHeadersOperationFilter>();
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

	public static IServiceCollection RegisterGomokuServices(this IServiceCollection services, Config config)
	{
		services.AddSingleton<IRandomProvider, RandomProvider>();
		services.AddSingleton<IGameRepository, InMemoryGameRepository>();
		services.AddSingleton<IPlayersRepository, InMemoryPlayersRepository>();
		services.AddScoped<IGameSessionHandler, GameSessionHandler>();

		services.AddRefitHttpClient<IClerkFrontendApi>((_, httpClient) =>
		{
			httpClient.BaseAddress = new Uri(config.Clerk.FrontendApiBaseUrl);
		});

		return services;
	}
}

public class AddRequiredHeadersOperationFilter : IOperationFilter
{
	public void Apply(OpenApiOperation operation, OperationFilterContext context)
	{
		var hasCustomHeaders = context.MethodInfo.GetCustomAttributes(true)
								  .OfType<AddCustomHeadersAttribute>()
								  .Any();

		if (hasCustomHeaders)
		{
			operation.Parameters.Add(new OpenApiParameter
			{
				Name = "Authorization",
				In = ParameterLocation.Header,
				Required = true,
				Schema = new OpenApiSchema
				{
					Type = "string",
					Default = new OpenApiString("Bearer ")
				}
			});

			operation.Parameters.Add(new OpenApiParameter
			{
				Name = "Content-Type",
				In = ParameterLocation.Header,
				Required = true,
				Schema = new OpenApiSchema
				{
					Type = "string",
					Default = new OpenApiString("application/json")
				}
			});
		}
	}
}
