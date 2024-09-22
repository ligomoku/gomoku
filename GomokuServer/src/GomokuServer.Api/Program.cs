var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

var envFileName = environment.ToLower() switch
{
	"development" => ".env.local",
	"production" => ".env.prod",
	_ => ".env.local"
};

var currentDirectory = Directory.GetCurrentDirectory();
var parentDirectory = Directory.GetParent(currentDirectory)?.Parent?.FullName;

if (parentDirectory == null)
{
	var envFilePathInDocker = Path.Combine(currentDirectory, "envs", envFileName);
	System.Console.WriteLine($"Using alternative env file path: {envFilePathInDocker}");
	DotNetEnv.Env.Load(envFilePathInDocker);
}
else
{
	var envFilePath = Path.Combine(parentDirectory, "..", "envs", envFileName);
	System.Console.WriteLine($"Env file path: {envFilePath}");
	DotNetEnv.Env.Load(envFilePath);
}

var localhostPort = Environment.GetEnvironmentVariable("VITE_LOCALHOST_PORT");

var configuration = builder.Configuration.GetSection<Configuration>("Configuration");

builder.Services.AddSwaggerExamplesFromAssemblyOf<NotFoundErrorExample>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
	var provider = builder.Services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

	foreach (var description in provider.ApiVersionDescriptions)
	{
		options.SwaggerDoc(description.GroupName, new Microsoft.OpenApi.Models.OpenApiInfo()
		{
			Title = $"Gomoku API v{description.ApiVersion}",
			Version = description.ApiVersion.ToString(),
			Description = description.IsDeprecated ? "This API version is deprecated" : ""
		});
	}

	var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
	var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
	options.IncludeXmlComments(xmlPath);

	options.ExampleFilters();
});

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
	var localhostUrl = $"http://localhost:{localhostPort}";

	options.AddPolicy(CorsPolicyName.GomokuClient,
		builder => builder
			.WithOrigins(localhostUrl, configuration.GomokuClient.BaseUrl)
			.WithMethods("GET", "POST", "PUT", "DELETE")
			.AllowAnyHeader()
			.AllowCredentials());
});

builder.Services.AddApiVersioning(option =>
{
	option.DefaultApiVersion = new ApiVersion(1, 0);
	option.AssumeDefaultVersionWhenUnspecified = true;
	option.ReportApiVersions = true;
	option.ApiVersionReader = new HeaderApiVersionReader("X-Version");
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

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
	var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
	foreach (var description in provider.ApiVersionDescriptions)
	{
		options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
	}
});

app.UseClerkJwtValidation();

app.UseCors(CorsPolicyName.GomokuClient);

app.MapControllers();

app.MapHub<GameHub>("/gamehub");

app.Run();
