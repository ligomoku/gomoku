using GomokuServer.Core.Games.Enums;

namespace GomokuServer.Core.Games.Extensions;

public static class GameResultExtensions
{
	public static string GetString(this GameResult gameResult)
	{
		return gameResult switch
		{
			GameResult.BlackWon => "Black won",
			GameResult.WhiteWon => "White won",
			GameResult.Tie => "Tie",
			GameResult.NotCompletedYet => "Not completed yet"
		};
	}
}
