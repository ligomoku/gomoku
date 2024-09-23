namespace GomokuServer.Api.Configuration;

public class ServiceConfigurator
{
	public void ConfigureServices(WebApplicationBuilder builder)
	{
		var localhostPort = Environment.GetEnvironmentVariable("VITE_LOCALHOST_PORT");
		var configuration = builder.Configuration.GetSection<Configuration>("Configuration");

		builder.Services.AddRouting(options => options.LowercaseUrls = true);
		builder.Services.AddControllers();
		builder.Services.AddSignalR();

		var swaggerConfigurator = new SwaggerConfigurator();
		swaggerConfigurator.ConfigureSwagger(builder.Services);

		builder.Services.AddCors(options =>
		{
			var localhostUrl = $"http://localhost:{localhostPort}";
			options.AddPolicy(CorsPolicyName.GomokuClient, policyBuilder => policyBuilder
				.WithOrigins(localhostUrl, configuration.GomokuClient.BaseUrl)
				.WithMethods("GET", "POST", "PUT", "DELETE")
				.AllowAnyHeader()
				.AllowCredentials());
		});

		builder.Services.AddApiVersioning(options =>
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

		builder.Services.AddMemoryCache();
		builder.Services.AddSingleton<IRandomProvider, RandomProvider>();
		builder.Services.AddSingleton<IGameRepository, InMemoryGameRepository>();
		builder.Services.AddSingleton<IPlayersRepository, InMemoryPlayersRepository>();
		builder.Services.AddScoped<IGameSessionHandler, GameSessionHandler>();

		builder.Services.AddRefitHttpClient<IClerkFrontendApi>((_, httpClient) =>
		{
			httpClient.BaseAddress = new Uri(configuration.Clerk.FrontendApiBaseUrl);
		});
	}
}
