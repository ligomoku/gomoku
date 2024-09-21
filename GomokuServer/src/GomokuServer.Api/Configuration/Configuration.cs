namespace GomokuServer.Api.Configuration;

public class Configuration
{
	public required Clerk Clerk { get; init; }
}

public class Clerk
{
	public required string FrontendApiBaseUrl { get; init; }
}
