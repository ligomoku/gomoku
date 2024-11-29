using System.Collections.Concurrent;

namespace GomokuServer.Api.MatchingEngine;

public class MatchingEngine(
	GameOptions gameOptions,
	ILogger<MatchingEngine> logger)
	: IMatchingEngine
{
	public GameOptions GameOptions { get; } = gameOptions;

	private readonly BlockingCollection<LobbyMember> _queue = [];
	private readonly ConcurrentDictionary<string, LobbyMember> _players = [];

	public delegate void MatchingEngineHandler(string firstPlayerId, string secondPlayerId);
	public event MatchingEngineHandler? OnMatching;

	public void Start()
	{
		LobbyMember? firstPlayer = null;
		foreach (LobbyMember player in _queue.GetConsumingEnumerable())
		{
			try
			{
				ProcessPlayer(player);
			}
			catch (Exception exception)
			{
				logger.LogCritical(
					exception,
					"Matching Engine (BoardSize: {BoardSize}, TimeControl: {InitialTimeInSeconds} + {IncrementPerMove}, Anonymous: {Anonymous}) failed while matching players.",
					GameOptions.BoardSize, GameOptions.TimeControl.InitialTimeInSeconds,
					GameOptions.TimeControl.IncrementPerMove, GameOptions.Anonymous);
			}
		}

		void ProcessPlayer(LobbyMember player)
		{
			if (firstPlayer != null)
			{
				HandleSecondPlayer(player);
			}
			else
			{
				AssignFirstPlayer(player);
			}
		}

		void HandleSecondPlayer(LobbyMember player)
		{
			var firstPlayerLeft = true;
			var gameCreated = false;

			lock (firstPlayer)
			{
				if (!firstPlayer.LeftQueue)
				{
					firstPlayerLeft = false;
					lock (player)
					{
						if (!player.LeftQueue)
						{
							gameCreated = true;
							firstPlayer.GameFound = true;
							player.GameFound = true;
							_ = OnMatch(firstPlayer, player);
						}
					}
				}
			}

			UpdateFirstPlayerState(gameCreated, firstPlayerLeft, player);
		}

		void AssignFirstPlayer(LobbyMember player)
		{
			if (!player.LeftQueue)
			{
				firstPlayer = player;
			}
		}

		void UpdateFirstPlayerState(bool gameCreated, bool firstPlayerLeft, LobbyMember player)
		{
			if (gameCreated)
			{
				firstPlayer = null;
			}
			else if (firstPlayerLeft)
			{
				firstPlayer = player.LeftQueue ? null : player;
			}
		}
	}

	public void TryAdd(string id)
	{
		if (_players.ContainsKey(id))
		{
			return;
		}

		var lobbyMember = new LobbyMember(id);
		_players.TryAdd(id, lobbyMember);
		_queue.Add(lobbyMember);
	}

	public void TryRemove(string id)
	{
		if (!_players.TryGetValue(id, out var lobbyMember))
		{
			return;
		}

		lock (lobbyMember)
		{
			if (!lobbyMember.GameFound)
			{
				lobbyMember.LeftQueue = true;
			}
		}

		if (lobbyMember.LeftQueue)
		{
			_players.TryRemove(id, out _);
		}
	}

	protected virtual Task OnMatch(LobbyMember firstPlayer, LobbyMember secondPlayer)
	{
		OnMatching?.Invoke(firstPlayer.Id, secondPlayer.Id);
		_players.TryRemove(firstPlayer.Id, out _);
		_players.TryRemove(secondPlayer.Id, out _);
		return Task.CompletedTask;
	}

	public void Stop()
	{
		_queue.CompleteAdding();
	}
}
