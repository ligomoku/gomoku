using Microsoft.AspNetCore.Authorization;

using SignalRSwaggerGen.Attributes;

namespace GomokuServer.Api.Hubs;

[SignalRHub(HubRoute.GameHub)]
public class GameHub : Hub, IGameHub
{
	private readonly IMediator _mediator;
	private readonly ILogger<GameHub> _logger;

	public GameHub(IMediator mediator, ILogger<GameHub> logger)
	{
		_mediator = mediator;
		_logger = logger;
	}

	public async Task JoinGameGroup(string gameId)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
		await Clients.Caller.SendAsync(GameHubMethod.GameGroupJoined, gameId);

		var getGameResult = await _mediator.Send(new GetGameCurrentStateQuery() { GameId = gameId });

		if (getGameResult.IsSuccess)
		{
			var game = getGameResult.Value;

			if (game.HasBothPlayersJoined && !game.IsGameStarted)
			{
				await Clients.User(game!.Players!.Black!.PlayerId).SendAsync(GameHubMethod.GameStarted, new GameStartedMessage(true));
				await Clients.User(game!.Players!.White!.PlayerId).SendAsync(GameHubMethod.GameStarted, new GameStartedMessage(false));
			}
		}
	}

	[AllowAnonymous]
	public async Task MakeMove(MakeMoveClientMessage message)
	{
		_logger.LogInformation($"Calling make move. Message: {message}");

		var playerId = GetPlayerId();

		var placeTileCommand = new PlaceTileCommand()
		{
			GameId = message.GameId,
			Tile = new TileDto(message.X, message.Y),
			PlayerId = playerId!
		};
		var placeTileResult = await _mediator.Send(placeTileCommand);

		if (placeTileResult.IsSuccess)
		{
			var playerMadeMoveMessage = new PlayerMadeMoveMessage()
			{
				PlayerId = playerId!,
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

	[AllowAnonymous]
	public async Task Resign(ResignClientMessage message)
	{
		var playerId = GetPlayerId();

		var resignCommand = new ResignCommand()
		{
			GameId = message.GameId,
			PlayerId = playerId
		};
		var resignResult = await _mediator.Send(resignCommand);

		if (resignResult.IsSuccess)
		{
			var playerResignedMessage = new PlayerResignedMessage()
			{
				PlayerId = playerId!
			};

			await Clients.Group(message.GameId).SendAsync(GameHubMethod.PlayerResigned, playerResignedMessage);
			// TODO: GameIsOver event
			return;
		}

		await Clients.Caller.SendAsync(GameHubMethod.GameHubError, resignResult.GetHubError());
	}

	[AllowAnonymous]
	public async Task SendMessage(ChatMessageClientMessage messageRequest)
	{
		_logger.LogInformation($"SendMessage called. {messageRequest}");

		await Clients.Group(messageRequest.GameId).SendAsync(GameHubMethod.SendMessage, messageRequest);
	}

	private string? GetPlayerId()
	{
		var playerId = Context?.User?.Claims.Get(JwtClaims.UserId);

		if (playerId == null)
		{
			playerId = Context?.GetHttpContext()?.Request.Query["player_id"];
		}

		return playerId;
	}
}
