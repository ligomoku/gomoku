namespace GomokuServer.Api.MatchingEngine;

public class MatchingEngineFactory(IHubContext<AnonymousGameHub> anonymousHubContext, IHubContext<RegisteredGameHub> registeredHubContext, IMediator mediator, ILogger<MatchingEngine> logger)
{
	public MatchingEngine CreateNew(GameOptions gameOptions) => gameOptions.Anonymous
		? new AnonymousMatchingEngine(gameOptions, anonymousHubContext, mediator, logger)
		: new RegisteredMatchingEngine(gameOptions, registeredHubContext, mediator, logger);
}
