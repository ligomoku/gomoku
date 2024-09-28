namespace GomokuServer.Api.Configuration;

public static class EnvironmentLoader
{
	public static Config LoadEnvironment(WebApplicationBuilder builder)
	{
		builder.Configuration.AddEnvironmentVariables();

		var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

		var envFileName = environment.ToLower() switch
		{
			"development" => ".env.local",
			"production" => ".env.prod",
			_ => ".env.local"
		};

		var envFilePath = GetEnvFilePath(envFileName);
		DotNetEnv.Env.Load(envFilePath);

		return GetAndValidateConfig();
	}

	private static Config GetAndValidateConfig()
	{
		var config = new Config()
		{
			GomokuClient = new()
			{
				BaseUrl = Environment.GetEnvironmentVariable("ASPNETCORE_CLIENT_APP_BASE_URL")!
			},
			Clerk = new()
			{
				FrontendApiBaseUrl = Environment.GetEnvironmentVariable("ASPNETCORE_CLERK_FRONTEND_API_BASE_URL")!,
				BackendApiBaseUrl = Environment.GetEnvironmentVariable("ASPNETCORE_CLERK_BACKEND_API_BASE_URL")!,
				BackendApiSecret = Environment.GetEnvironmentVariable("ASPNETCORE_CLERK_BACKEND_API_SECRET")!
			}
		};

		ValidateConfig(config);

		return config;
	}

	private static void ValidateConfig(object obj, string? parentName = null)
	{
		var properties = obj.GetType().GetProperties();

		foreach (var property in properties)
		{
			var value = property.GetValue(obj);
			var propertyName = parentName != null ? $"{parentName}.{property.Name}" : property.Name;

			if (property.PropertyType == typeof(string))
			{
				if (string.IsNullOrWhiteSpace(value?.ToString()))
				{
					throw new InvalidOperationException($"Configuration error: {propertyName} is missing or empty.");
				}
			}
			else if (property.PropertyType.IsClass && value != null)
			{
				ValidateConfig(value, propertyName);
			}
		}
	}

	private static string GetEnvFilePath(string envFileName)
	{
		var currentDirectory = Directory.GetCurrentDirectory();
		var parentDirectory = Directory.GetParent(currentDirectory)?.Parent?.FullName;

		return parentDirectory == null
			? Path.Combine(currentDirectory, "envs", envFileName)
			: Path.Combine(parentDirectory, "..", "envs", envFileName);
	}
}
