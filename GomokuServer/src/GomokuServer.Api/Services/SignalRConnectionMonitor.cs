using Microsoft.Extensions.Options;

namespace GomokuServer.Api.Services;

public class SignalRConnectionMonitorOptions
{
	//TODO: configure these options in appsettings.json
	public int CheckIntervalSeconds { get; set; } = 10;
	public int ConnectionTimeoutMs { get; set; } = 15000;
}

public class SignalRConnectionMonitor : BackgroundService
{
	private readonly IHubContext<GameHub> _hubContext;
	private readonly ILogger<SignalRConnectionMonitor> _logger;
	private readonly SignalRConnectionMonitorOptions _options;

	public SignalRConnectionMonitor(
		IHubContext<GameHub> hubContext,
		ILogger<SignalRConnectionMonitor> logger,
		IOptions<SignalRConnectionMonitorOptions> options)
	{
		_hubContext = hubContext;
		_logger = logger;
		_options = options.Value;
	}

	protected override async Task ExecuteAsync(CancellationToken stoppingToken)
	{
		while (!stoppingToken.IsCancellationRequested)
		{
			try
			{
				await CheckConnections(stoppingToken);
				await Task.Delay(TimeSpan.FromSeconds(_options.CheckIntervalSeconds), stoppingToken);
			}
			catch (Exception ex) when (ex is not OperationCanceledException)
			{
				_logger.LogError(ex, "Error occurred while monitoring connections");
				await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
			}
		}
	}

	private async Task CheckConnections(CancellationToken stoppingToken)
	{
		var currentTime = DateTime.UtcNow;
		var staleConnections = GameHub.LastHeartbeat
			.Where(kvp => (currentTime - kvp.Value).TotalMilliseconds > _options.ConnectionTimeoutMs)
			.ToList();

		foreach (var connection in staleConnections)
		{
			try
			{
				await _hubContext.Groups.RemoveFromGroupAsync(
					connection.Key,
					"ConnectedUsers",
					stoppingToken
				);

				GameHub.LastHeartbeat.TryRemove(connection.Key, out _);

				_logger.LogInformation(
					"Removed stale connection {ConnectionId}. Last heartbeat: {LastHeartbeat}",
					connection.Key,
					connection.Value
				);
			}
			catch (Exception ex)
			{
				_logger.LogError(
					ex,
					"Error removing stale connection {ConnectionId}",
					connection.Key
				);
			}
		}
	}
}
