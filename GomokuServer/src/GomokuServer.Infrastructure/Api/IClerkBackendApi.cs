namespace GomokuServer.Infrastructure.Api;

public interface IClerkBackendApi
{
	[Get("/users/{userId}")]
	Task<GetUserResponse> GetUserByIdAsync([AliasAs("userId")] string userId);
}

public record GetUserResponse
{
	public required string Id { get; init; }
	public required string Username { get; init; }
}
