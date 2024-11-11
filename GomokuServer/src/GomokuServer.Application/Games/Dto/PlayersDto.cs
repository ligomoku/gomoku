namespace GomokuServer.Application.Games.Dto;

[TranspilationSource]
public record PlayersDto
{
	public PlayerDto? Black { get; init; }

	public PlayerDto? White { get; init; }

	public static PlayersDto Empty()
	{
		return new();
	}
}
