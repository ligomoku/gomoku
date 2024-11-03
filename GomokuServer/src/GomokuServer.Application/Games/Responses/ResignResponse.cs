namespace GomokuServer.Application.Games.Responses;

public class ResignResponse
{
	[Required]
	public required PlayerDto Winner { get; init; }
}
