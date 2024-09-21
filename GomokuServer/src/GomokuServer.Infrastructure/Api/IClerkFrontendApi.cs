namespace GomokuServer.Infrastructure.Api;

public interface IClerkFrontendApi
{
	[Get("/.well-known/jwks.json")]
	Task<string> GetJwks();
}
