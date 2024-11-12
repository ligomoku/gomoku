namespace GomokuServer.Api.Constants;

public static class HubRoute
{
	[Obsolete("Use registered and anonymous hub separately")]
	public const string GameHub = "/gamehub";
	public const string RegisteredGameHub = "/gamehub/registered";
	public const string AnonymousGameHub = "/gamehub/anonymous";
}
