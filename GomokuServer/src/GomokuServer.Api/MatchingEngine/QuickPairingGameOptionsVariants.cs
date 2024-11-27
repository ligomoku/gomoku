namespace GomokuServer.Api.MatchingEngine;

public static class QuickPairingGameOptionsVariants
{
	public readonly static List<GameOptions> Values;

	public static bool IsValidGameOptions(GameOptions gameOptions) =>
		Values.Contains(gameOptions);
	
	static QuickPairingGameOptionsVariants()
	{
		Values = [];
		
		foreach (var isAnonymous in new[] { true, false })
		{
			Values.AddRange([
				new GameOptions(
					13,
					new TimeControlDto() { InitialTimeInSeconds = 60, IncrementPerMove = 0 },
					isAnonymous),
				new GameOptions(
					13,
					new TimeControlDto() { InitialTimeInSeconds = 60, IncrementPerMove = 1 },
					isAnonymous),
				new GameOptions(
					13,
					new TimeControlDto() { InitialTimeInSeconds = 60, IncrementPerMove = 2 },
					isAnonymous),

				new GameOptions(
					13,
					new TimeControlDto() { InitialTimeInSeconds = 120, IncrementPerMove = 1 },
					isAnonymous),
				new GameOptions(
					13,
					new TimeControlDto() { InitialTimeInSeconds = 300, IncrementPerMove = 0 },
					isAnonymous),
				new GameOptions(
					17,
					new TimeControlDto() { InitialTimeInSeconds = 420, IncrementPerMove = 0 },
					isAnonymous),
				
				new GameOptions(
					17,
					new TimeControlDto() { InitialTimeInSeconds = 600, IncrementPerMove = 0 },
					isAnonymous),
				new GameOptions(
					19,
					new TimeControlDto() { InitialTimeInSeconds = 900, IncrementPerMove = 0 },
					isAnonymous),
				new GameOptions(
					19,
					new TimeControlDto() { InitialTimeInSeconds = 1800, IncrementPerMove = 0 },
					isAnonymous)
			]);
		}
	}
}
