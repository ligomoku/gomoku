namespace GomokuServer.Application.Games.Dto;

[TranspilationSource]
public record ClockDto(int Black, int White)
{
	[Required]
	public int Black { get; } = Black;

	[Required]
	public int White { get; } = White;
}
