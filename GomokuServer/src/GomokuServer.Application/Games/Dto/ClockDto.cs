namespace GomokuServer.Application.Games.Dto;

public record ClockDto(int Black, int White)
{
	[Required]
	public int Black { get; } = Black;

	[Required]
	public int White { get; } = White;
}
