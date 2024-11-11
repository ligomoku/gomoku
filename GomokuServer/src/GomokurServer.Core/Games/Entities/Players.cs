namespace GomokuServer.Core.Games.Entities;

public record Players(Player black, Player white)
{
	public Player Black { get; } = black;

	public Player White { get; } = white;

	public Player GetPlayer(string playerId)
	{
		return playerId == White.Id ? White : Black;
	}

	public Player GetOpponent(string playerId)
	{
		return playerId == White.Id ? Black : White;
	}

	public Players GetSwitchedColors() => new(White, Black);
}
