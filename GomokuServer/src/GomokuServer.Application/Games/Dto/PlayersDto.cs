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

	public bool IsInvolved(string playerId)
	{
		return Black?.PlayerId == playerId || White?.PlayerId == playerId;
	}
}
