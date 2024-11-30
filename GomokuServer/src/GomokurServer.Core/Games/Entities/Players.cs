using GomokuServer.Core.Games.Enums;

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

	public Players GetSwitchedColors()
	{
		var newBlackPlayer = White with { Color = TileColor.Black };
		var newWhitePlayer = Black with { Color = TileColor.White };
		return new(newBlackPlayer, newWhitePlayer);
	}
}
