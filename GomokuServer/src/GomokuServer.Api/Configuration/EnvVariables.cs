namespace GomokuServer.Api.Configuration;

public record EnvVariables
{
	public required GomokuClient GomokuClient { get; init; }
	public required Clerk Clerk { get; init; }
	public required Centry Centry { get; set; }
}

public record GomokuClient
{
	public required string BaseUrl { get; init; }
}

public record Clerk
{
	public required string FrontendApiBaseUrl { get; init; }
	public required string BackendApiBaseUrl { get; init; }
	public required string BackendApiSecret { get; set; }
}

public record Centry
{
	public string? Dsn { get; init; }
}
