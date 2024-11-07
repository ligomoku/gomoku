using GomokuServer.Core.Common.Interfaces;

namespace GomokuServer.Core.Games.Entities;

public class Clock
{
	private long? _lastStartTime;
	private long _remainingTimeInMilliseconds;
	private readonly TimeControl _timeControl;
	private readonly IDateTimeProvider _dateTimeProvider;

	public Clock(TimeControl timeControl, IDateTimeProvider dateTimeProvider)
	{
		_remainingTimeInMilliseconds = timeControl.InitialTimeInSeconds * 1000;
		_timeControl = timeControl;
		_dateTimeProvider = dateTimeProvider;
	}

	public long RemainingTimeInMilliseconds
	{
		get
		{
			if (_lastStartTime.HasValue)
			{
				return _remainingTimeInMilliseconds - (_dateTimeProvider.UtcNowUnixTimeMilliseconds - _lastStartTime.Value);
			}

			return _remainingTimeInMilliseconds;
		}
	}

	public void Start()
	{
		if (!_lastStartTime.HasValue)
		{
			_lastStartTime = _dateTimeProvider.UtcNowUnixTimeMilliseconds;
		}
	}

	public void Stop()
	{
		if (_lastStartTime.HasValue)
		{
			_remainingTimeInMilliseconds -= (int)(_dateTimeProvider.UtcNowUnixTimeMilliseconds - _lastStartTime.Value);
			_remainingTimeInMilliseconds += _timeControl.IncrementPerMove * 1000;
			_lastStartTime = null;
		}
	}
}
