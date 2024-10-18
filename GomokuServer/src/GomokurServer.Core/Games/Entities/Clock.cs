using GomokuServer.Core.Common.Interfaces;

namespace GomokuServer.Core.Games.Entities;

public class Clock
{
	private long? _lastStartTime;
	private long _remainingTimeInSeconds;
	private readonly TimeControl _timeControl;
	private readonly IDateTimeProvider _dateTimeProvider;

	public Clock(TimeControl timeControl, IDateTimeProvider dateTimeProvider)
	{
		_remainingTimeInSeconds = timeControl.InitialTimeInSeconds;
		_timeControl = timeControl;
		_dateTimeProvider = dateTimeProvider;
	}

	public long RemainingTimeInSeconds =>
		_lastStartTime.HasValue 
			? _remainingTimeInSeconds - (_dateTimeProvider.UtcNowInPosix - _lastStartTime.Value)
			: _remainingTimeInSeconds;

	public void Start()
	{
		if (!_lastStartTime.HasValue) 
		{
			_lastStartTime = _dateTimeProvider.UtcNowInPosix;
		}
	}

	public void Stop()
	{
		if (_lastStartTime.HasValue)
		{
			_remainingTimeInSeconds -= (_dateTimeProvider.UtcNowInPosix - _lastStartTime.Value);
			_remainingTimeInSeconds += _timeControl.IncrementPerMove;
			_lastStartTime = null;
		}
	}

	public void AddTime(long incrementInSeconds)
	{
		_remainingTimeInSeconds += incrementInSeconds;
	}
}
