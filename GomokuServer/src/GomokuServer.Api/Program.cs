var builder = WebApplication.CreateBuilder(args);

var envVariables = EnvironmentLoader.LoadEnvironment(builder);

builder.Services.RegisterSwagger();

builder.Services.RegisterApiVersioning();

builder.Services.RegisterCors(CorsPolicyName.GomokuClient, envVariables);

builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddControllers();

builder.Services.RegisterAuthentication();

builder.Services.RegisterSignalR();

builder.Services.RegisterCache(builder.Configuration);

builder.Services.RegisterGomokuServices(envVariables);

builder.Logging.RegisterLogger(envVariables);

builder.Services.AddHttpClient("RapfiEngine", client =>
{
	client.BaseAddress = new Uri(builder.Configuration["RAPFI_ENGINE_URL"] ?? "http://rapfi:5000");
});

var app = builder.Build();

app.UseSwaggerPage();

app.UseCors(CorsPolicyName.GomokuClient);

app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();
app.UseJwtClaimsValidation();

app.MapHub<RegisteredGameHub>(HubRoute.RegisteredGameHub);
app.MapHub<AnonymousGameHub>(HubRoute.AnonymousGameHub);

app.Run();

// Required for functional tests
public partial class Program { }
