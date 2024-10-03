using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace GomokuServer.Api.Swagger.Filters;

public class MandatoryHeadersParametersOperationFilter : IOperationFilter
{
	public void Apply(OpenApiOperation operation, OperationFilterContext context)
	{
		operation.Parameters.Add(new OpenApiParameter
		{
			Name = "Content-Type",
			In = ParameterLocation.Header,
			Required = true,
			Schema = new OpenApiSchema
			{
				Type = "string",
				Default = new OpenApiString("application/json")
			}
		});
	}
}
