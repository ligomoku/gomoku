namespace GomokuServer.Api.Configuration;

public class EnvironmentLoader
{
	public void LoadEnvironment()
	{
		var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

		var envFileName = environment.ToLower() switch
		{
			"development" => ".env.local",
			"production" => ".env.prod",
			_ => ".env.local"
		};

		var envFilePath = GetEnvFilePath(envFileName);
		Console.WriteLine($"Env file path: {envFilePath}");
		DotNetEnv.Env.Load(envFilePath);
	}

	private string GetEnvFilePath(string envFileName)
	{
		var currentDirectory = Directory.GetCurrentDirectory();
		var parentDirectory = Directory.GetParent(currentDirectory)?.Parent?.FullName;

		return parentDirectory == null
			? Path.Combine(currentDirectory, "envs", envFileName)
			: Path.Combine(parentDirectory, "..", "envs", envFileName);
	}
}
