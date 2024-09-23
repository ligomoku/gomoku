var builder = WebApplication.CreateBuilder(args);

// Configure environment variables
builder.Host.ConfigureAppConfiguration((context, config) =>
{
	config.AddEnvironmentVariables();
});

// Load environment
var environmentLoader = new EnvironmentLoader(builder.Configuration);
environmentLoader.LoadEnvironment();

// Configure services
var serviceConfigurator = new ServiceConfigurator();
serviceConfigurator.ConfigureServices(builder);

// Build the app
var app = builder.Build();

// Configure the app
var appConfigurator = new AppConfigurator();
appConfigurator.ConfigureApp(app);
