namespace GomokuServer.Application.Games.Dto;

public record TimeControlDto()
{
	[Required]
	public required int InitialTimeInSeconds { get; init; }

	[Required]
	public required int IncrementPerMove { get; init; }
}
