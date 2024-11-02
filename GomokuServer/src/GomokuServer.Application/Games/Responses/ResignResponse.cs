namespace GomokuServer.Application.Games.Responses;

public class ResignResponse
{
	[Required]
	public required string WinnerColor { get; init; }
}
