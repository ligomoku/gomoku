namespace GomokuServer.Application.Games.Dto;

[TranspilationSource]
public record TimeControlDto
{
	[Required]
	public required int InitialTimeInSeconds { get; init; }

	[Required]
	public required int IncrementPerMove { get; init; }

	public static TimeControlDto? FromDomainEntity(TimeControl? timeControl)
	{
		return timeControl != null ? new()
		{
			InitialTimeInSeconds = timeControl.InitialTimeInSeconds,
			IncrementPerMove = timeControl.IncrementPerMove,
		} : null;
	}
}
