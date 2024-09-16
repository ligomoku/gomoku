using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace GomokuServer.Api;

public class SwaggerVersionFilter : IOperationFilter
{
	private readonly IApiVersionDescriptionProvider _provider;

	public SwaggerVersionFilter(IApiVersionDescriptionProvider provider)
	{
		_provider = provider;
	}

	public void Apply(OpenApiOperation operation, OperationFilterContext context)
	{
		var description = _provider.ApiVersionDescriptions
			.FirstOrDefault(d => d.GroupName == context.ApiDescription.GroupName);

		if (description != null)
		{
			var info = new OpenApiInfo()
			{
				Title = $"Gomoku API v{description.ApiVersion}",
				Version = description.ApiVersion.ToString(),
				Description = description.IsDeprecated ? "This API version is deprecated" : ""
			};
		}
	}
}
