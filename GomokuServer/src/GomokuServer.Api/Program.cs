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

var app = builder.Build();

app.UseSwaggerPage();

app.UseCors(CorsPolicyName.GomokuClient);

app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();
app.UseJwtClaimsValidation();

app.MapHub<GameHub>(HubRoute.GameHub);

app.Run();

// Required for functional tests
public partial class Program { }
