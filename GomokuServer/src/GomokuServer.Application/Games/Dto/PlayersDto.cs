namespace GomokuServer.Application.Games.Dto;

public record PlayersDto
{
	public PlayerDto? Black { get; init; }

	public PlayerDto? White { get; init; }
}
