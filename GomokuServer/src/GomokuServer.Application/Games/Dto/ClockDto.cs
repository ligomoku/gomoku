namespace GomokuServer.Application.Games.Dto;

[TranspilationSource]
public record ClockDto(long Black, long White)
{
	[Required]
	public long Black { get; } = Black;

	[Required]
	public long White { get; } = White;

	public static ClockDto? GetInitialClock(TimeControl? timeControl)
	{
		return timeControl != null
			? new ClockDto(timeControl.InitialTimeInSeconds, timeControl.InitialTimeInSeconds)
			: null;
	}
}
