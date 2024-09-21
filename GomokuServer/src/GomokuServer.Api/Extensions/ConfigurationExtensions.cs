namespace GomokuServer.Api.Extensions;

public static class ConfigurationExtensions
{
	public static T GetSection<T>(this IConfiguration configuration, string sectionName) where T : class
	{
		return configuration.GetSection(sectionName).Get<T>() ?? throw new ArgumentException($"Section with name {sectionName} not found...");
	}
}
