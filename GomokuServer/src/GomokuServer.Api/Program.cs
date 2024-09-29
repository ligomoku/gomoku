//TODO: maybe move to SeviceCollectionExtensions ?
public static class ServiceExtensions
{
	public static void AddCoreServices(this IServiceCollection services, Config config)
	{
		services.RegisterSwagger();
		services.RegisterApiVersioning();
		services.RegisterCors(CorsPolicyName.GomokuClient, config);
		services.AddRouting(options => options.LowercaseUrls = true);
		services.AddControllers();
		services.AddSignalR();
		services.AddMemoryCache();
		services.RegisterGomokuServices(config);
	}
}

//TODO: maybe move to application builder extensions ?
public static class ApplicationExtensions
{
	public static void UseCoreMiddlewares(this WebApplication app)
	{
		app.UseSwaggerPage();
		app.UseCors(CorsPolicyName.GomokuClient);
		app.UseClerkJwtValidation();
		app.UseClerkJwtClaimsValidation();
		app.MapControllers();
		app.MapHub<GameHub>(HubRoute.GameHub);
	}
}

internal static class Program
{
	public static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		var config = EnvironmentLoader.LoadEnvironment(builder);

		builder.Services.AddCoreServices(config);

		var app = builder.Build();

		app.UseCoreMiddlewares();
		app.Run();
	}
}
