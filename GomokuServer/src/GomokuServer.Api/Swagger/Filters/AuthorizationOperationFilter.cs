using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace GomokuServer.Api.Swagger.Filters;

public class AuthorizationOperationFilter : IOperationFilter
{
	public void Apply(OpenApiOperation operation, OperationFilterContext context)
	{
		var hasAuthAttribute = ControllerHasAuthAttribute(context) || MethodHasAuthAttribute(context);

		if (hasAuthAttribute)
		{
			operation.Parameters.Add(new OpenApiParameter
			{
				Name = "Authorization",
				In = ParameterLocation.Header,
				Required = true,
				Schema = new OpenApiSchema
				{
					Type = "string",
					Default = new OpenApiString("Bearer ")
				}
			});

			operation.Security.Add(new OpenApiSecurityRequirement
			{
				{
					new OpenApiSecurityScheme
					{
						Reference = new OpenApiReference
						{
							Type = ReferenceType.SecurityScheme,
							Id = "Bearer"
						}
					},
					Array.Empty<string>()
				}
			});
		}
	}

	private static bool ControllerHasAuthAttribute(OperationFilterContext context)
	{
		var controllerType = context.MethodInfo.DeclaringType;

		return controllerType != null
			? controllerType.GetCustomAttributes(true).OfType<AuthorizeAttribute>().Any()
			: false;
	}

	private static bool MethodHasAuthAttribute(OperationFilterContext context)
	{
		return context.MethodInfo.GetCustomAttributes(true).OfType<AuthorizeAttribute>().Any();
	}
}
