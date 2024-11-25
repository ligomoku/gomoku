namespace GomokuServer.Api;

public class MatchingEngineHostedService(CompositeMatchingEngine compositeMatchingEngine, MatchingEngineFactory matchingEngineFactory) : IHostedService
{
	public Task StartAsync(CancellationToken cancellationToken)
	{
		var onePlusZeroMode = new GameOptions(
			13,
			new TimeControlDto() { InitialTimeInSeconds = 60, IncrementPerMove = 0 },
			true);

		compositeMatchingEngine.AddEngine(matchingEngineFactory.CreateNew(onePlusZeroMode));
		compositeMatchingEngine.Start();
		return Task.CompletedTask;
	}

	public Task StopAsync(CancellationToken cancellationToken)
	{
		// TODO: Implement
		return Task.CompletedTask;
	}
}
