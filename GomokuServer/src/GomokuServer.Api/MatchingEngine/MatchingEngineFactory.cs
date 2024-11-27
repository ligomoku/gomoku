namespace GomokuServer.Api.MatchingEngine;

public class MatchingEngineFactory(IHubContext<AnonymousGameHub> anonymousHubContext, IHubContext<RegisteredGameHub> registeredHubContext, IMediator mediator)
{
	public MatchingEngine CreateNew(GameOptions gameOptions) =>
		new (gameOptions, gameOptions.Anonymous ? anonymousHubContext : registeredHubContext, mediator);
}
