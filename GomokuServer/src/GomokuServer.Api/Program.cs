var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

var environmentLoader = new EnvironmentLoader();
environmentLoader.LoadEnvironment();
ServiceConfigurator.ConfigureServices(builder);

var app = builder.Build();
AppConfigurator.ConfigureApp(app);
