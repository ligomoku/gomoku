using GomokuServer.Core.Common.Interfaces;

namespace GomokuServer.Core.Games.Entities;

public class Clock
{
	private long? _startTime;
	private long _remainingTimeInSeconds;
	private readonly TimeControl _timeControl;
	private readonly IDateTimeProvider _dateTimeProvider;

	public Clock(TimeControl timeControl, IDateTimeProvider dateTimeProvider)
	{
		_remainingTimeInSeconds = timeControl.InitialTimeInMinutes * 60;
		_timeControl = timeControl;
		_dateTimeProvider = dateTimeProvider;
	}

	public long RemainingTimeInSeconds =>
		_startTime.HasValue 
			? _remainingTimeInSeconds - (_dateTimeProvider.UtcNowInPosix - _startTime.Value)
			: _remainingTimeInSeconds;

	public void Start()
	{
		if (!_startTime.HasValue) 
		{
			_startTime = _dateTimeProvider.UtcNowInPosix;
		}
	}

	public void Stop()
	{
		if (_startTime.HasValue)
		{
			_remainingTimeInSeconds -= (_dateTimeProvider.UtcNowInPosix - _startTime.Value);
			_remainingTimeInSeconds += _timeControl.IncrementPerMove;
			_startTime = null;
		}
	}

	public void AddTime(long incrementInSeconds)
	{
		_remainingTimeInSeconds += incrementInSeconds;
	}
}
