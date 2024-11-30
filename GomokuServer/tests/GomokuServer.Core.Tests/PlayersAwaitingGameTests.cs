using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Validations;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Core.UnitTests;

public class PlayersAwaitingGameTests
{
	private PlayersAwaitingGameSettings _gameSettings;
	private IDateTimeProvider _dateTimeProvider;
	private IRandomProvider _randomProvider;
	private PlayersAwaitingGame _playersAwaitingGame;

	[SetUp]
	public void SetUp()
	{
		_gameSettings = new PlayersAwaitingGameSettings() { BoardSize = 15 };
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);
		_playersAwaitingGame = new PlayersAwaitingGame(_gameSettings, _randomProvider, _dateTimeProvider);
	}

	[Test]
	public void AddPlayer_WhenBothPlacesAreTaken_ShouldReturnError()
	{
		// Arrange
		_playersAwaitingGame.AddPlayer(new Profile("id1", "username1"));
		_playersAwaitingGame.AddPlayer(new Profile("id2", "username2"));

		// Act
		var result = _playersAwaitingGame.AddPlayer(new Profile("id3", "username3"));

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(GameActionValidationError.BothPlacesTakenAlready);
		result.ErrorDetails.Should().NotBeEmpty();
	}

	[Test]
	public void AddPlayer_SamePlayerAddedTwice_ShouldReturnIsValid()
	{
		// Arrange
		var player = new Profile("id", "username");
		_playersAwaitingGame.AddPlayer(player);

		// Act
		var result = _playersAwaitingGame.AddPlayer(player);

		// Assert
		result.IsValid.Should().BeTrue();
	}

	[Test]
	public void AddPlayer_WhenNoPlayersJoined_ShouldReturnSuccess()
	{
		// Act
		var addPlayerResult = _playersAwaitingGame.AddPlayer(new Profile("id", "username"));

		// Assert
		addPlayerResult.IsValid.Should().BeTrue();
		addPlayerResult.CreatedGame.Should().BeNull();
	}

	[Test]
	public void AddPlayer_WhenOnePlayersJoined_ShouldReturnSuccessAndCreatedGame()
	{
		// Arrange
		_playersAwaitingGame.AddPlayer(new Profile("id", "username"));

		// Act
		var addPlayerResult = _playersAwaitingGame.AddPlayer(new Profile("id2", "username2"));

		// Assert
		addPlayerResult.IsValid.Should().BeTrue();
		addPlayerResult.CreatedGame.Should().NotBeNull();
		addPlayerResult.CreatedGame?.Players.Black.Id.Should().Be("id");
		addPlayerResult.CreatedGame?.Players.White.Id.Should().Be("id2");
	}

	[Test]
	public void AddPlayer_InGameWithControl_WhenOnePlayerJoined_ShouldReturnSuccessAndCreatedGameWithTimeControl()
	{
		// Arrange
		_gameSettings = _gameSettings with { TimeControl = new TimeControl(180, 2) };
		_playersAwaitingGame = new PlayersAwaitingGame(_gameSettings, _randomProvider, _dateTimeProvider);
		_playersAwaitingGame.AddPlayer(new Profile("id1", "username1"));

		// Act
		var addPlayerResult = _playersAwaitingGame.AddPlayer(new Profile("id2", "username2")); ;

		// Assert
		addPlayerResult.IsValid.Should().BeTrue();
		addPlayerResult.CreatedGame.Should().BeOfType<GameWithTimeControl>();
	}
}
