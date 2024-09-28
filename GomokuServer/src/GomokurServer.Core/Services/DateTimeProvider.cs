using GomokuServer.Core.Interfaces;

namespace GomokuServer.Core.Services;

public class DateTimeProvider : IDateTimeProvider
{
	public DateTime UtcNow => DateTime.UtcNow;
}
