namespace GomokuServer.Core.Interfaces;

public interface IRandomProvider
{
	int GetInt(int minValue, int maxValue);
}
