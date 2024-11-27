namespace GomokuServer.Api;

public class MatchingEngineHostedService(
	CompositeMatchingEngine compositeMatchingEngine,
	MatchingEngineFactory matchingEngineFactory) : IHostedService
{
	public Task StartAsync(CancellationToken cancellationToken)
	{
		foreach (var gameOption in QuickPairingGameOptionsVariants.Values)
		{
			compositeMatchingEngine.AddEngine(matchingEngineFactory.CreateNew(gameOption));
		}

		compositeMatchingEngine.Start();
		return Task.CompletedTask;
	}

	public Task StopAsync(CancellationToken cancellationToken)
	{
		compositeMatchingEngine.Stop();
		return Task.CompletedTask;
	}
}
