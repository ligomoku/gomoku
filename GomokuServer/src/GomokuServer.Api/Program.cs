var builder = WebApplication.CreateBuilder(args);

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
});

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
	var localhostUrl = "http://localhost:4200";
	var vercelUrl = "https://gomoku-ruddy.vercel.app";

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

builder.Services.AddSingleton<IGameRepository, InMemoryGameRepository>();
builder.Services.AddSingleton<IPlayersRepository, InMemoryPlayersRepository>();
builder.Services.AddScoped<IGameSessionHandler, GameSessionHandler>();

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

app.UseCors(CorsPolicyName.GomokuClient);
app.MapControllers();

app.Run();
