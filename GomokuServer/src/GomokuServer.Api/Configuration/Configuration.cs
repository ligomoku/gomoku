namespace GomokuServer.Api.Configuration;

public class Configuration
{
	public required GomokuClient GomokuClient { get; init; }
	public required Clerk Clerk { get; init; }
}

public class GomokuClient
{
	public required string BaseUrl { get; init; }
}


public class Clerk
{
	public required string FrontendApiBaseUrl { get; init; }
}
