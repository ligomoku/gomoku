namespace GomokuServer.Api.Hubs;

using System.Security.Claims;

using GomokuServer.Api.Hubs.Messages.Client;
using GomokuServer.Api.Hubs.Messages.Server;

using MediatR;

using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

using SignalRSwaggerGen.Attributes;

[SignalRHub(HubRoute.GameHub)]
public class GameHub : Hub
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
	}

	public async Task MakeMove(MakeMoveClientMessage makeMoveMessage)
	{
		_logger.LogInformation($"Calling make move. Message: {makeMoveMessage}");

		if (Context.Items["User"] is ClaimsPrincipal user)
		{
			var userId = user.Claims.Get("userId");

			var placeTileCommand = new PlaceTileCommand() { GameId = makeMoveMessage.GameId, Tile = new TileDto(makeMoveMessage.X, makeMoveMessage.Y), PlayerId = userId! };
			var placeTileResult = await _mediator.Send(placeTileCommand);

			if (placeTileResult.IsSuccess)
			{
				var playerMadeMoveMessage = new PlayerMadeMoveMessage()
				{
					PlayerId = userId!,
					Tile = new TileDto(makeMoveMessage.X, makeMoveMessage.Y),
					PlacedTileColor = placeTileResult.Value.PlacedTileColor
				};
				await Clients.Group(makeMoveMessage.GameId).SendAsync(GameHubMethod.PlayerMadeMove, playerMadeMoveMessage);
				return;
			}

			await Clients.Caller.SendAsync(GameHubMethod.GameHubError, placeTileResult.GetHubError());
		}
		else
		{
			await Clients.Caller.SendAsync(GameHubMethod.GameHubError, new ErrorMessage("Error. Unable to parse JWT token"));
		}
	}

	public async Task ReceiveMessage(string user, string message)
	{
		Console.WriteLine($"ReceiveMessage called with user: {user}, message: {message}");
		await Clients.All.SendAsync(GameHubMethod.ReceiveMessage, user, message);
	}
}
