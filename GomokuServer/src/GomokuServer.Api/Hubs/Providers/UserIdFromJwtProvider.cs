namespace GomokuServer.Api.Hubs.Providers;

/// <summary>
/// Allows to override where userId is retrived for hub connection context
/// Required to send messages from hubs to single user by id.
/// </summary>
public class UserIdFromJwtProvider : IUserIdProvider
{
	public string? GetUserId(HubConnectionContext connectionContext)
	{
		var userId = connectionContext?.User?.Claims?.Get(JwtClaims.UserId);

		if (string.IsNullOrEmpty(userId))
		{
			userId = connectionContext?.GetHttpContext()?.Request.Query["player_id"];
		}

		return userId;
	}
}
