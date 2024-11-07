namespace GomokuServer.Application.Games.Dto;

[TranspilationSource]
public record ClockDto(long Black, long White)
{
	[Required]
	public long Black { get; } = Black;

	[Required]
	public long White { get; } = White;
}
