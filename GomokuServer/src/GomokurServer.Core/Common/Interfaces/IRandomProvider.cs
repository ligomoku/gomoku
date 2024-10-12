namespace GomokuServer.Core.Common.Interfaces;

public interface IRandomProvider
{
	int GetInt(int minValue, int maxValue);
}
