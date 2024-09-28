var builder = WebApplication.CreateBuilder(args);

var config = EnvironmentLoader.LoadEnvironment(builder);

builder.Services.RegisterSwagger();

builder.Services.RegisterApiVersioning();

builder.Services.RegisterCors(CorsPolicyName.GomokuClient, config);

builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddMemoryCache();

builder.Services.RegisterGomokuServices(config);

var app = builder.Build();

app.UseSwaggerPage();

app.UseCors(CorsPolicyName.GomokuClient);

app.UseClerkJwtValidation();

app.MapControllers();
app.MapHub<GameHub>(HubRoute.GameHub);

app.Run();
