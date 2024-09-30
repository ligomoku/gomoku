namespace GomokuServer.Api.Hubs;

using System.Security.Claims;

using GomokuServer.Api.Hubs.Messages.Client;
using GomokuServer.Api.Hubs.Messages.Server;

using Microsoft.AspNetCore.SignalR;

using SignalRSwaggerGen.Attributes;

[SignalRHub(HubRoute.GameHub)]
public class GameHub : Hub
{
	private readonly IGameSessionHandler _gameSessionHandler;

	public GameHub(IGameSessionHandler gameSessionHandler)
	{
		_gameSessionHandler = gameSessionHandler;
	}

	public async Task JoinGameGroup(string gameId)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
		await Clients.Caller.SendAsync(GameHubMethod.GameGroupJoined, gameId);
	}

	public async Task MakeMove(MakeMoveClientMessage makeMoveMessage)
	{
		if (Context.Items["User"] is ClaimsPrincipal user)
		{
			var userId = Context.User?.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

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

	public async Task SendMessage(string user, string message)
	{
		Console.WriteLine($"SendMessage called with user: {user}, message: {message}");
		await Clients.All.SendAsync("ReceiveMessage", user, message);
	}
}
