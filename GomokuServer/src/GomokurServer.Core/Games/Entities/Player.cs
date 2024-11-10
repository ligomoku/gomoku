using GomokuServer.Core.Games.Enums;

namespace GomokuServer.Core.Games.Entities;

public record Player(string Id, string UserName, TileColor Color)
{
	public GameResult GetGameResultFromColor()
	{
		return Color == TileColor.Black ? GameResult.BlackWon : GameResult.WhiteWon;
	}
};
