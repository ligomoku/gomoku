using Microsoft.OpenApi.Models;
using GomokuServer.Api.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddApiVersioning(options =>
{
	options.DefaultApiVersion = new ApiVersion(1, 0);
	options.AssumeDefaultVersionWhenUnspecified = true;
	options.ReportApiVersions = true;
	options.ApiVersionReader = new HeaderApiVersionReader("X-Version");
});

builder.Services.AddSwaggerGen(options =>
{
	options.SwaggerDoc("v1", new OpenApiInfo { Title = "GomokuServer API", Version = "v1.0" });
	options.SwaggerDoc("v2", new OpenApiInfo { Title = "GomokuServer API", Version = "v2.0" });
});

builder.Services.AddCors(options =>
{
	const string localhostUrl = "http://localhost:4200";
	const string vercelUrl = "https://gomoku-ruddy.vercel.app";

	options.AddPolicy("GomokuClient", policyBuilder =>
		policyBuilder
			.WithOrigins(localhostUrl, vercelUrl)
			.WithMethods("GET", "POST", "PUT", "DELETE")
			.AllowAnyHeader()
			.AllowCredentials());
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI(options =>
{
	options.SwaggerEndpoint("/swagger/v1/swagger.json", "GomokuServer API V1");
	options.SwaggerEndpoint("/swagger/v2/swagger.json", "GomokuServer API V2");
});

app.UseCors("GomokuClient");
app.UseRouting();
app.MapControllers();
app.MapHub<GameHub>("/gamehub");

app.Run();
