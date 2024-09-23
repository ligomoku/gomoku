var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

var environmentLoader = new EnvironmentLoader();
environmentLoader.LoadEnvironment();

var serviceConfigurator = new ServiceConfigurator();
serviceConfigurator.ConfigureServices(builder);

var app = builder.Build();

var appConfigurator = new AppConfigurator();
appConfigurator.ConfigureApp(app);
