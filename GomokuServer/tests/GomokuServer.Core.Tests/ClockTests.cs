using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Core.UnitTests;

public class ClockTests
{
	private IDateTimeProvider _dateTimeProvider;
	private TimeControl _timeControl;
	private Clock _clock;

	[SetUp]
	public void SetUp()
	{
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_timeControl = new TimeControl(180, 2);
		_clock = new Clock(_timeControl, _dateTimeProvider);
	}

	[Test]
	public void Clock_ShouldInitializeWithCorrectRemainingTime()
	{
		// Assert
		_clock.RemainingTimeInMilliseconds.Should().Be(180_000);
	}

	[Test]
	public void Clock_WithoutIncrement_ShouldDecreaseAmoutOfRemainingTimeAfterStop()
	{
		// Arrange
		_clock = new Clock(new TimeControl(180, 0), _dateTimeProvider);
		_dateTimeProvider.UtcNowUnixTimeMilliseconds.Returns(1_000_000);
		_clock.Start();
		_dateTimeProvider.UtcNowUnixTimeMilliseconds.Returns(1_050_000);

		// Act
		_clock.Stop();

		// Assert
		_clock.RemainingTimeInMilliseconds.Should().Be(130_000);
	}

	[Test]
	public void Clock_WithIncrement_ShouldDecreaseAmoutOfRemainingTimeAfterStop_AndAddIncrementSeconds()
	{
		// Arrange
		_clock = new Clock(new TimeControl(180, 2), _dateTimeProvider);
		_dateTimeProvider.UtcNowUnixTimeMilliseconds.Returns(1_000_000);
		_clock.Start();
		_dateTimeProvider.UtcNowUnixTimeMilliseconds.Returns(1_050_000);

		// Act
		_clock.Stop();

		// Assert
		_clock.RemainingTimeInMilliseconds.Should().Be(132_000);
	}

	[Test]
	public void Clock_MultipleStartCalls_ShouldKeepFirstSaveTime()
	{
		// Arrange
		_clock = new Clock(new TimeControl(180, 0), _dateTimeProvider);
		_dateTimeProvider.UtcNowUnixTimeMilliseconds.Returns(1_000_000);
		_clock.Start();
		_dateTimeProvider.UtcNowUnixTimeMilliseconds.Returns(1_020_000);
		_clock.Start();
		_dateTimeProvider.UtcNowUnixTimeMilliseconds.Returns(1_050_000);

		// Act
		_clock.Stop();

		// Assert
		_clock.RemainingTimeInMilliseconds.Should().Be(130_000);
	}
}
