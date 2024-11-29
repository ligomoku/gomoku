namespace GomokuServer.Api.MatchingEngine;

public class MatchingEngineHostedService(
	CompositeMatchingEngine compositeMatchingEngine,
	MatchingEngineFactory matchingEngineFactory) : IHostedService
{
	public Task StartAsync(CancellationToken cancellationToken)
	{
		QuickPairingGameOptionsVariants.Values
			.ForEach(gameOptions => compositeMatchingEngine.AddEngine(matchingEngineFactory.CreateNew(gameOptions)));
		
		compositeMatchingEngine.Start();
		return Task.CompletedTask;
	}

	public Task StopAsync(CancellationToken cancellationToken)
	{
		compositeMatchingEngine.Stop();
		return Task.CompletedTask;
	}
}
