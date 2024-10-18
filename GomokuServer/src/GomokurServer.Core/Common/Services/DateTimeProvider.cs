using GomokuServer.Core.Common.Interfaces;

namespace GomokuServer.Core.Common.Services;

public class DateTimeProvider : IDateTimeProvider
{
	public DateTime UtcNow => DateTime.UtcNow;

	public long UtcNowInPosix => DateTimeOffset.UtcNow.ToUnixTimeSeconds();
}
