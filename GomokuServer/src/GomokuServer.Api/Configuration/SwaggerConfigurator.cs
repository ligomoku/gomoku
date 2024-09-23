namespace GomokuServer.Api.Configuration;

public class SwaggerConfigurator
{
	public static void ConfigureSwagger(IServiceCollection services)
	{
		services.AddSwaggerExamplesFromAssemblyOf<NotFoundErrorExample>();
		services.AddEndpointsApiExplorer();
		services.AddSwaggerGen(options =>
		{
			var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

			foreach (var description in provider.ApiVersionDescriptions)
			{
				options.SwaggerDoc(description.GroupName, new Microsoft.OpenApi.Models.OpenApiInfo()
				{
					Title = $"Gomoku API v{description.ApiVersion}",
					Version = description.ApiVersion.ToString(),
					Description = description.IsDeprecated ? "This API version is deprecated" : string.Empty
				});
			}

			var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
			var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
			options.IncludeXmlComments(xmlPath);

			options.ExampleFilters();
		});
	}

	public static void ConfigureSwaggerUi(IApplicationBuilder app)
	{
		app.UseSwagger();
		app.UseSwaggerUI(options =>
		{
			var provider = app.ApplicationServices.GetRequiredService<IApiVersionDescriptionProvider>();

			foreach (var description in provider.ApiVersionDescriptions)
			{
				options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
			}
		});
	}
}
