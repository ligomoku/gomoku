namespace GomokuServer.Application.Games.Dto;

[TranspilationSource]
public record PlayersDto
{
	[Required]
	public required PlayerDto? Black { get; init; }

	[Required]
	public required PlayerDto? White { get; init; }

	public static PlayersDto Empty()
	{
		return new PlayersDto
		{
			Black = null,
			White = null
		};
	}

	public bool IsInvolved(string playerId)
	{
		return Black?.PlayerId == playerId || White?.PlayerId == playerId;
	}
}
