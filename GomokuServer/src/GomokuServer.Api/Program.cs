var builder = WebApplication.CreateBuilder(args);

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
	const string localhostUrl = "http://localhost:4200";
	const string vercelUrl = "https://gomoku-ruddy.vercel.app";

	options.AddPolicy(CorsPolicyName.GomokuClient,
		builder => builder
			.WithOrigins(localhostUrl, vercelUrl)
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
