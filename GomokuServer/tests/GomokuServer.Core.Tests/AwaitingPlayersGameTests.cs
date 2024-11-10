using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Validations;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Core.UnitTests;

public class AwaitingPlayersGameTests
{
	private AwaitingPlayersGameSettings _gameSettings;
	private IDateTimeProvider _dateTimeProvider;
	private IRandomProvider _randomProvider;
	private AwaitingPlayersGame _awaitingPlayersGame;

	[SetUp]
	public void SetUp()
	{
		_gameSettings = new AwaitingPlayersGameSettings() { BoardSize = 15 };
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_awaitingPlayersGame = new AwaitingPlayersGame(_gameSettings, _randomProvider, _dateTimeProvider);
	}

	[Test]
	public void AddPlayer_WhenBothPlacesAreTaken_ShouldReturnError()
	{
		// Arrange
		_awaitingPlayersGame.AddPlayer(new Profile("id1", "username1"));
		_awaitingPlayersGame.AddPlayer(new Profile("id2", "username2"));

		// Act
		var result = _awaitingPlayersGame.AddPlayer(new Profile("id3", "username3"));

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(PlayerAddingValidationError.BothPlacesTakenAlready);
		result.ErrorDetails.Should().NotBeEmpty();
	}

	[Test]
	public void AddPlayer_SamePlayerAddedTwice_ShouldReturnError()
	{
		// Arrange
		var player = new Profile("id", "username");
		_awaitingPlayersGame.AddPlayer(player);

		// Act
		var result = _awaitingPlayersGame.AddPlayer(player);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(PlayerAddingValidationError.PlayerAlreadyAddedToGame);
		result.ErrorDetails.Should().NotBeEmpty();
	}

	[Test]
	public void AddPlayer_WhenNoPlayersJoined_ShouldReturnSuccess()
	{
		// Act
		var addPlayerResult = _awaitingPlayersGame.AddPlayer(new Profile("id", "username"));

		// Assert
		addPlayerResult.IsValid.Should().BeTrue();
		addPlayerResult.CreatedGame.Should().BeNull();
	}

	[Test]
	public void AddPlayer_WhenOnePlayersJoined_ShouldReturnSuccessAndCreatedGame()
	{
		// Act
		var addPlayerResult = _awaitingPlayersGame.AddPlayer(new Profile("id", "username"));

		// Assert
		addPlayerResult.IsValid.Should().BeTrue();
		addPlayerResult.CreatedGame.Should().BeNull();
	}

	[Test]
	public void AddPlayer_InGameWithControl_WhenOnePlayerJoined_ShouldReturnSuccessAndCreatedGameWithTimeControl()
	{
		// Arrange
		_gameSettings = _gameSettings with { TimeControl = new TimeControl(180, 2) };
		_awaitingPlayersGame = new AwaitingPlayersGame(_gameSettings, _randomProvider, _dateTimeProvider);
		_awaitingPlayersGame.AddPlayer(new Profile("id1", "username1"));

		// Act
		var addPlayerResult = _awaitingPlayersGame.AddPlayer(new Profile("id2", "username2")); ;

		// Assert
		addPlayerResult.IsValid.Should().BeTrue();
		addPlayerResult.CreatedGame.Should().BeOfType<GameWithTimeControl>();
	}
}
