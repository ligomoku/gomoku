using System.Collections.Concurrent;

namespace GomokuServer.Api.MatchingEngine;

public class CompositeMatchingEngine
{
	private readonly Dictionary<GameOptions, IMatchingEngine> _matchingEngines = [];
	private readonly ConcurrentDictionary<string, GameOptions> _playerMap = [];

	public void Start()
	{
		foreach (var engine in _matchingEngines.Values)
		{
			Task.Factory.StartNew(() => engine.Start(), TaskCreationOptions.LongRunning);
		}
	}

	public void Stop()
	{
		foreach (var engine in _matchingEngines.Values)
		{
			engine.Stop();
		}
	}
	
	public void AddEngine(MatchingEngine matchingEngine)
	{
		_matchingEngines.Add(matchingEngine.GameOptions, matchingEngine);
		matchingEngine.OnMatching += HandleMatching;
	}

	public void TryAdd(string id, GameOptions gameOptions)
	{
		if (_playerMap.TryAdd(id, gameOptions))
		{
			_matchingEngines[gameOptions].TryAdd(id);
		}
	}

	public void TryRemove(string id)
	{
		var removed = _playerMap.TryRemove(id, out var gameOptions);
		if (!removed)
		{
			return;
		}

		if (gameOptions is not null)
		{
			_matchingEngines[gameOptions!].TryRemove(id);
		}
	}

	private void HandleMatching(string firstPlayerId, string secondPlayerId)
	{
		_playerMap.TryRemove(firstPlayerId, out _);
		_playerMap.TryRemove(secondPlayerId, out _);
	}
}
