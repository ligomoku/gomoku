using GomokuServer.Core.Interfaces;

namespace GomokuServer.Core.Services;

public class RandomProvider : IRandomProvider
{
	private readonly Random _random = new Random();

	public int GetInt(int minValue, int maxValue)
	{
		return _random.Next(minValue, maxValue);
	}
}
