namespace GomokuServer.Api.Configuration;

	public class AppConfigurator
	{
		private readonly SwaggerConfigurator _swaggerConfigurator;

		public AppConfigurator()
		{
			_swaggerConfigurator = new SwaggerConfigurator();
		}

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
			_swaggerConfigurator.ConfigureSwaggerUI(app);
		}

		private void ConfigureSecurity(WebApplication app)
		{
			app.UseAuthentication();
			app.UseAuthorization();

			app.UseClerkJwtValidation();
		}
	}
