namespace GomokuServer.Api.Configuration;

public class AppConfigurator
{
	public void ConfigureApp(WebApplication app)
	{
		ConfigureSwagger(app);
		ConfigureSecurity(app);

		app.UseCors(CorsPolicyName.GomokuClient);

		app.MapControllers();
		app.MapHub<GameHub>("/gamehub");

		app.Run();
	}

	private void ConfigureSwagger(WebApplication app)
	{
		SwaggerConfigurator.ConfigureSwaggerUi(app);
	}

	private void ConfigureSecurity(WebApplication app)
	{
		app.UseAuthentication();
		app.UseAuthorization();

		app.UseClerkJwtValidation();
	}
}
