using System.Collections.Concurrent;

using GomokuServer.Application.Games.Commands.Abstract;

namespace GomokuServer.Api;

public class MatchingEngine(GameOptions gameOptions, IHubContext<GameHub> hubContext, IMediator mediator) : IMatchingEngine
{
	public GameOptions GameOptions { get; } = gameOptions;

	private readonly BlockingCollection<LobbyMember> _queue = [];
	private readonly ConcurrentDictionary<string, LobbyMember> _players = [];

	public delegate void MatchingEngineHandler(string firstPlayerId, string secondPlayerId);
	public event MatchingEngineHandler? OnMatching;

	public async Task Start()
	{
		LobbyMember? firstPlayer = null;
		foreach (LobbyMember player in _queue.GetConsumingEnumerable())
		{
			try
			{
				if (firstPlayer != null)
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
									// OnMatch(firstPlayer, player);
								}
							}
						}
					}

					if (gameCreated)
					{
						// since await cannot be used in lock block, onMatch call was moved here.
						// theoretically, in this time user can leave queue, so ensure that if game created,
						// it is impossible to leave queue.
						await OnMatch(firstPlayer, player);
						firstPlayer = null;
					}
					else if (firstPlayerLeft)
					{
						firstPlayer = player.LeftQueue ? null : player;
					}
				}
				else
				{
					if (!player.LeftQueue)
					{
						firstPlayer = player;
					}
				}
			}
			catch
			{
				// TODO: Logging.
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

	private async Task OnMatch(LobbyMember firstPlayer, LobbyMember secondPlayer)
	{
		var createGameResult = await mediator.Send(new CreateGameForPairCommand
		{
			Anonymous = GameOptions.Anonymous,
			BoardSize = GameOptions.BoardSize,
			FirstPlayerId = firstPlayer.Id,
			SecondPlayerId = secondPlayer.Id,
			TimeControl = GameOptions.TimeControl
		});

		if (createGameResult.IsSuccess)
		{
			await hubContext.Clients.User(firstPlayer.Id).SendAsync(GameHubMethod.OnMatchingPlayerFound, createGameResult.Value.GameId);
			await hubContext.Clients.User(secondPlayer.Id).SendAsync(GameHubMethod.OnMatchingPlayerFound, createGameResult.Value.GameId);

			OnMatching?.Invoke(firstPlayer.Id, secondPlayer.Id);
			_players.TryRemove(firstPlayer.Id, out _);
			_players.TryRemove(secondPlayer.Id, out _);
		}
	}
}

public class LobbyMember(string id)
{
	public string Id { get; } = id;
	public bool LeftQueue { get; set; } = false;
	public bool GameFound { get; set; } = false;
}
