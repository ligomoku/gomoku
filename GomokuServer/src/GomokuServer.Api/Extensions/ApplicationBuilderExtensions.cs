namespace GomokuServer.Api.Extensions;

public static class ApplicationBuilderExtensions
{
	public static IApplicationBuilder UseSwaggerPage(this IApplicationBuilder app)
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

		return app;
	}
}
