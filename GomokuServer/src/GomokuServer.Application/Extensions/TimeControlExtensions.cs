namespace GomokuServer.Application.Extensions;

public static class TimeControlExtensions
{
	public static TimeControlDto ToDto(this TimeControl timeControl)
	{
		return new TimeControlDto
		{
			IncrementPerMove = timeControl.IncrementPerMove,
			InitialTimeInSeconds = timeControl.InitialTimeInSeconds,
		};
	}
}
