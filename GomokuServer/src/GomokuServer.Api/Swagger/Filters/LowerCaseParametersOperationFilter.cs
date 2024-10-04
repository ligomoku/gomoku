using GomokuServer.Application.Extensions;

using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace GomokuServer.Api.Swagger.Filters;

public class LowerCaseParametersOperationFilter : IOperationFilter
{
	private readonly IEnumerable<string> _parametersExceptions = [
		"X-Version"
	];

	public void Apply(OpenApiOperation operation, OperationFilterContext context)
	{
		if (operation.Parameters != null && operation.Parameters.Any())
		{
			foreach (var parameter in operation.Parameters)
			{
				if (!_parametersExceptions.Contains(parameter.Name))
				{
					parameter.Name = parameter.Name.ToCamelCase();
				}
			}
		}
	}
}
