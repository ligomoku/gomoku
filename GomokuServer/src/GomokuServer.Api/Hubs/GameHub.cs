namespace GomokuServer.Api.Hubs;

using Microsoft.AspNetCore.SignalR;

using SignalRSwaggerGen.Attributes;

[SignalRHub(HubRoute.GameHub)]
public class GameHub : Hub
{
	public async Task JoinGameGroup(string gameId)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
		await Clients.Caller.SendAsync(GameHubMethod.GameGroupJoined, gameId);
	}

	public async Task SendMessage(string user, string message)
	{
		await Clients.All.SendAsync("ReceiveMessage", user, message);
	}
}
