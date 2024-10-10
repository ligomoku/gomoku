namespace GomokuServer.Infrastructure.Cache;

public class CacheServiceSettings
{
	public required TimeSpan TimeToLiveInMinutes { get; init; }
}
