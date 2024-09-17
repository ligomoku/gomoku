namespace GomokuServer.Api.Hubs;

using Microsoft.AspNetCore.SignalR;

public class GameHub : Hub
{
	public async Task SendMessage(string user, string message)
	{
		await Clients.All.SendAsync("ReceiveMessage", user, message);
	}
}
