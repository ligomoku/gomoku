using MessagePack;

namespace GomokuServer.Api.Hubs;

using System.Security.Claims;

using GomokuServer.Api.Hubs.Messages.Client;
using GomokuServer.Api.Hubs.Messages.Server;

using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

using SignalRSwaggerGen.Attributes;

[SignalRHub(HubRoute.GameHub)]
public class GameHub : Hub
{
	private readonly IGameSessionHandler _gameSessionHandler;
	private readonly ILogger<GameHub> _logger;

	public GameHub(IGameSessionHandler gameSessionHandler, ILogger<GameHub> logger)
	{
		_gameSessionHandler = gameSessionHandler;
		_logger = logger;
	}

	public async Task JoinGameGroup(string gameId)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
		await Clients.Caller.SendAsync(GameHubMethod.GameGroupJoined, gameId);
	}

	public async Task MakeMove(MakeMoveClientMessage makeMoveMessage)
	{
		_logger.LogInformation($"Calling make move. Message: {makeMoveMessage}");

		if (Context.Items["User"] is ClaimsPrincipal user)
		{
			var userId = user.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

			var placeTileResult = await _gameSessionHandler.PlaceTileAsync(makeMoveMessage.GameId, new TileDto(makeMoveMessage.X, makeMoveMessage.Y), userId!);

			if (placeTileResult.IsSuccess)
			{
				var playerMadeMoveMessage = new PlayerMadeMoveServerMessage()
				{
					PlayerId = userId!,
					Tile = new TileDto(makeMoveMessage.X, makeMoveMessage.Y),
				};
				await Clients.Group(makeMoveMessage.GameId).SendAsync(GameHubMethod.PlayerMadeMove, playerMadeMoveMessage);
				return;
			}

			var errorMessage = new ErrorServerMessage()
			{
				Message = "Error. Unable to make move"
			};
			await Clients.Caller.SendAsync(GameHubMethod.Error, errorMessage);
		}
		else
		{
			var errorMessage = new ErrorServerMessage()
			{
				Message = "Error. Unable to parse JWT token"
			};
			await Clients.Caller.SendAsync(GameHubMethod.Error, errorMessage);
		}
	}

	public async Task SendMessage(byte[] packedData)
	{
		var decodedMessage = MessagePackSerializer.Deserialize<ChatMessageClientMessage>(packedData);
		Console.WriteLine($"SendMessage called with user: {decodedMessage.User}, message: {decodedMessage.Message}");
		await Clients.All.SendAsync("ReceiveMessage", decodedMessage.User, decodedMessage.Message);
	}

	public async Task ReceiveMessage(string user, string message)
	{
		Console.WriteLine($"ReceiveMessage called with user: {user}, message: {message}");
		await Clients.Caller.SendAsync(GameHubMethod.ReceiveMessage, user, message);
	}
}
