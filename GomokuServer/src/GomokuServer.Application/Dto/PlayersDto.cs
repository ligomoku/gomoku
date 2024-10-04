namespace GomokuServer.Application.Dto;

public record PlayersDto
{
	public PlayerDto? Black { get; init; }

	public PlayerDto? White { get; init; }
}
