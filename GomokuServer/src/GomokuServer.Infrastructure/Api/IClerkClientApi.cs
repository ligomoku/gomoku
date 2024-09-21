namespace GomokuServer.Infrastructure.Api;

public interface IClerkClientApi
{
	[Get("/.well-known/jwks.json")]
	Task<string> GetJwks();
}
