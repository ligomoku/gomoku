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
			// Use middleware for Swagger
			ConfigureSwagger(app);

			// Enable authentication and authorization middleware
			ConfigureSecurity(app);

			// Use CORS
			app.UseCors(CorsPolicyName.GomokuClient);

			// Map Controllers and SignalR Hubs
			app.MapControllers();
			app.MapHub<GameHub>("/gamehub");

			// Start the application
			app.Run();
		}

		private void ConfigureSwagger(WebApplication app)
		{
			_swaggerConfigurator.ConfigureSwaggerUI(app);
		}

		private void ConfigureSecurity(WebApplication app)
		{
			// Add authentication, authorization, or other security middleware
			app.UseAuthentication();
			app.UseAuthorization();

			// Custom JWT validation for Clerk
			app.UseClerkJwtValidation();
		}
	}
