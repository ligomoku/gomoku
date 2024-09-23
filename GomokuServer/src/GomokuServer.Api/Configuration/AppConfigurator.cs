namespace GomokuServer.Api.Configuration;

public static class AppConfigurator
{
	public static void ConfigureApp(WebApplication app)
	{
		ConfigureSwagger(app);
		ConfigureSecurity(app);

		app.UseCors(CorsPolicyName.GomokuClient);

		app.MapControllers();
		app.MapHub<GameHub>("/gamehub");

		app.Run();
	}

	private static void ConfigureSwagger(WebApplication app)
	{
		SwaggerConfigurator.ConfigureSwaggerUi(app);
	}

	private static void ConfigureSecurity(WebApplication app)
	{
		app.UseAuthentication();
		app.UseAuthorization();

		app.UseClerkJwtValidation();
	}
}
