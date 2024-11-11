namespace GomokuServer.Core.Games.Entities;

public record GameWithTimeControlSettings : GameSettings
{
	public required TimeControl TimeControl { get; init; }
}
