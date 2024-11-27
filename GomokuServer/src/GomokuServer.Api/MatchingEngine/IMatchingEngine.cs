namespace GomokuServer.Api.MatchingEngine;

public interface IMatchingEngine
{
	GameOptions GameOptions { get; }
	
	void Start();

	void Stop();
	
	void TryAdd(string id);
	
	void TryRemove(string id);
}
