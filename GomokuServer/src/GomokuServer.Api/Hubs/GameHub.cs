using Ardalis.Result;

using GomokuServer.Application.Games.Responses;

namespace GomokuServer.Api.Hubs;

public abstract class GameHub : Hub, IGameHub
{
	public virtual async Task JoinGameGroup(string gameId)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
		await Clients.Caller.SendAsync(GameHubMethod.GameGroupJoined, gameId);

		var getGameResult = await GetGameHistoryAsync(gameId);

		if (getGameResult.IsSuccess)
		{
			var game = getGameResult.Value;

			if (game.HasBothPlayersJoined && !game.IsGameStarted)
			{
				await Clients.User(game!.Players!.Black!.PlayerId).SendAsync(GameHubMethod.GameStarted, new GameStartedMessage(true));
				await Clients.User(game!.Players!.White!.PlayerId).SendAsync(GameHubMethod.GameStarted, new GameStartedMessage(false));
				await Clients.Group(gameId).SendAsync(GameHubMethod.BothPlayersJoined, new BothPlayersJoinedMessage(game.Players));
			}
			return;
		}

		await Clients.Caller.SendAsync(GameHubMethod.GameHubError, new ErrorMessage("Game not found"));
	}

	public virtual async Task GetClock(GetClockMessage message)
	{
		var getGameResult = await GetGameHistoryAsync(message.GameId);

		if (getGameResult.IsSuccess)
		{
			var game = getGameResult.Value;
			var clock = game.Clock;

			await Clients.Caller.SendAsync(GameHubMethod.Clock, clock);
		}
	}

	public virtual async Task MakeMove(MakeMoveClientMessage message)
	{
		var placeTileResult = await PlaceTileAsync(message.GameId, new TileDto(message.X, message.Y));

		if (placeTileResult.IsSuccess)
		{
			var playerMadeMoveMessage = new PlayerMadeMoveMessage()
			{
				PlayerId = GetPlayerId(),
				Tile = new TileDto(message.X, message.Y),
				PlacedTileColor = placeTileResult.Value.PlacedTileColor
			};
			await Clients.Group(message.GameId).SendAsync(GameHubMethod.PlayerMadeMove, playerMadeMoveMessage);

			var placeTileResponse = placeTileResult.Value;

			if (placeTileResponse.IsWinningMove)
			{
				var gameResult = new GameIsOverMessage()
				{
					Result = $"{placeTileResponse.PlacedTileColor.ToCamelCase()}Won",
					WinningSequence = placeTileResponse.WinningSequence
				};
				await Clients.Group(message.GameId).SendAsync(GameHubMethod.GameIsOver, gameResult);
			}
			return;
		}

		await Clients.Caller.SendAsync(GameHubMethod.GameHubError, placeTileResult.GetHubError());
	}

	public virtual async Task Resign(ResignClientMessage message)
	{
		var resignResult = await ResignAsync(message.GameId);

		if (resignResult.IsSuccess)
		{
			var gameIsOverMessage = new GameIsOverMessage()
			{
				Result = $"Winner is {resignResult.Value.Winner.Color}. Opponent resigned",
			};

			await Clients.Group(message.GameId).SendAsync(GameHubMethod.GameIsOver, gameIsOverMessage);
			return;
		}

		await Clients.Caller.SendAsync(GameHubMethod.GameHubError, resignResult.GetHubError());
	}

	public virtual async Task RequestRematch(RematchRequestMessage message)
	{
		var getGameHistoryResult = await GetGameHistoryAsync(message.GameId);

		if (getGameHistoryResult.IsSuccess)
		{
			var gameHistory = getGameHistoryResult.Value;
			if (!gameHistory.IsCompleted)
			{
				await Clients.Caller.SendAsync(GameHubMethod.GameHubError, new ErrorMessage("Game is not over yet"));
				return;
			}

			var opponent = GetPlayerId() != gameHistory.Players.Black!.PlayerId ? gameHistory.Players.Black : gameHistory.Players.White;
			await Clients.User(opponent!.PlayerId).SendAsync(GameHubMethod.RematchRequested, gameHistory.Players.Black.PlayerId);
			return;
		}

		await Clients.Caller.SendAsync(GameHubMethod.GameHubError, getGameHistoryResult.GetHubError());
	}

	public virtual async Task ApproveRematch(ApproveRematchMessage message)
	{
		var rematchResult = await RematchAsync(message.GameId);

		if (rematchResult.IsSuccess)
		{
			await Clients.Group(message.GameId).SendAsync(GameHubMethod.RematchApproved, new RematchApprovedMessage { NewGameId = rematchResult.Value.NewGameId });
			return;
		}

		await Clients.Caller.SendAsync(GameHubMethod.GameHubError, rematchResult.GetHubError());
	}

	public virtual async Task SendMessage(ChatMessageClientMessage messageRequest)
	{
		await Clients.Group(messageRequest.GameId).SendAsync(GameHubMethod.SendMessage, messageRequest);
	}

	protected abstract string GetPlayerId();

	protected abstract Task<Result<GetGameHistoryResponse>> GetGameHistoryAsync(string gameId);

	protected abstract Task<Result<PlaceTileResponse>> PlaceTileAsync(string gameId, TileDto tileDto);

	protected abstract Task<Result<ResignResponse>> ResignAsync(string gameId);

	protected abstract Task<Result<RematchResponse>> RematchAsync(string gameId);
}
