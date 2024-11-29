namespace GomokuServer.Api.MatchingEngine;

public class RegisteredMatchingEngine(GameOptions gameOptions,
	IHubContext<GameHub> hubContext,
	IMediator mediator,
	ILogger<MatchingEngine> logger) : MatchingEngine(gameOptions, logger)
{
	protected override async Task OnMatch(LobbyMember firstPlayer, LobbyMember secondPlayer)
	{
		await base.OnMatch(firstPlayer, secondPlayer);

		var createGameResult = await mediator.Send(new CreateRegisteredGameForPairCommand()
		{
			BoardSize = GameOptions.BoardSize,
			FirstPlayerId = firstPlayer.Id,
			SecondPlayerId = secondPlayer.Id,
			TimeControl = GameOptions.TimeControl
		});

		if (createGameResult.IsSuccess)
		{
			await hubContext.Clients.User(firstPlayer.Id)
				.SendAsync(GameHubMethod.OnMatchingPlayerFound, createGameResult.Value.GameId);
			await hubContext.Clients.User(secondPlayer.Id)
				.SendAsync(GameHubMethod.OnMatchingPlayerFound, createGameResult.Value.GameId);
		}
	}
}
