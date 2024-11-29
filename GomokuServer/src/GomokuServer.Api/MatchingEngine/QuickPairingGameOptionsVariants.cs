namespace GomokuServer.Api.MatchingEngine;

public static class QuickPairingGameOptionsVariants
{
	public readonly static List<GameOptions> Values;

	public static bool IsValidGameOptions(GameOptions gameOptions) =>
		Values.Contains(gameOptions);
	
	static QuickPairingGameOptionsVariants()
	{
		Values = [];
		var gameOptionsData = new (int BoardSize, int InitialTimeInSeconds, int IncrementPerMove)[]
		{
			(13, 60, 0),
			(13, 60, 1),
			(13, 60, 2),
			(13, 120, 1),
			(13, 300, 0),
			(17, 420, 0),
			(17, 600, 0),
			(19, 900, 0),
			(19, 1800, 0)
		};
		
		foreach (var isAnonymous in new[] { true, false })
		{
			foreach (var data in gameOptionsData)
			{
				Values.Add(new GameOptions(
					data.BoardSize,
					new TimeControlDto { InitialTimeInSeconds = data.InitialTimeInSeconds, IncrementPerMove = data.IncrementPerMove },
					isAnonymous));
			}
		}
	}
}
