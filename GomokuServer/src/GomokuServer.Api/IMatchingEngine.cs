namespace GomokuServer.Api;

public interface IMatchingEngine
{
	GameOptions GameOptions { get; }
	Task Start();
	void TryAdd(string id);
	void TryRemove(string id);
}
