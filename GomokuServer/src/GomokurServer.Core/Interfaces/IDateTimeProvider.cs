namespace GomokuServer.Core.Interfaces;

public interface IDateTimeProvider
{
	DateTime UtcNow { get; }
}
