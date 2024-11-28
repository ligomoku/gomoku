namespace GomokuServer.Infrastructure.Api;

public interface IRapfiEngineApi
{
	[Get("/test")]
	Task<string> TestConnection();
}
