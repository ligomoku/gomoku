namespace GomokuServer.Api;

public class MatchingEngineFactory(IHubContext<AnonymousGameHub> anonymousHubContext, IHubContext<RegisteredGameHub> registeredHubContext, IMediator mediator)
{
	public MatchingEngine CreateNew(GameOptions gameOptions) =>
		new MatchingEngine(gameOptions, gameOptions.Anonymous ? anonymousHubContext : registeredHubContext, mediator);
}
