using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Validation;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Core.UnitTests;

public class GameWithTimeControlTests
{
	private Profile _blackPlayer;
	private Profile _whitePlayer;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;
	private GameWithTimeControl _game;

	[SetUp]
	public void SetUp()
	{
		_blackPlayer = new Profile("1", "UserName1");
		_whitePlayer = new Profile("2", "UserName2");
		_randomProvider = Substitute.For<IRandomProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_dateTimeProvider.UtcNowInPosix.Returns(1000);

		_game = new GameWithTimeControl(15, new TimeControl(180, 2), _randomProvider, _dateTimeProvider);
		_game.AddOpponent(_blackPlayer);
		_game.AddOpponent(_whitePlayer);
	}

	[Test]
	public void PlaceTime_WhenTimeIsNotOver_ShouldBeSuccess()
	{
		// Act
		var result = _game.PlaceTile(new Tile(0, 0), _blackPlayer.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Result.Should().Be(GameResult.NotCompletedYet);
		_game.Status.Should().Be(GameStatus.InProgress);
		_game.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void PlaceTile_WhenFirstMoveIsMadeAfterLongTimeAfterCreation_ShouldBeSuccess()
	{
		// Arrange
		_dateTimeProvider.UtcNowInPosix.Returns(2000);

		// Act
		var result = _game.PlaceTile(new Tile(1, 1), _blackPlayer.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Result.Should().Be(GameResult.NotCompletedYet);
		_game.Status.Should().Be(GameStatus.InProgress);
		_game.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void PlaceTile_WhenTimeIsOver_ShouldBeError_AndGameStateShouldBeCorrect()
	{
		// Arrange
		_game.PlaceTile(new Tile(0, 0), _blackPlayer.Id);
		_dateTimeProvider.UtcNowInPosix.Returns(1181);

		// Act
		var result = _game.PlaceTile(new Tile(1, 1), _whitePlayer.Id);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.TimeOut);
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.TimeOut);
	}

	[Test]
	public void PlaceTile_WhenTimeIsOver_AndCallingPlaceTileForTheSecondTime_ShouldBeError_AndGameStateShouldBeCorrect()
	{
		// Arrange
		_game.PlaceTile(new Tile(0, 0), _blackPlayer.Id);
		_dateTimeProvider.UtcNowInPosix.Returns(1181);
		_game.PlaceTile(new Tile(1, 1), _whitePlayer.Id);

		// Act
		var result = _game.PlaceTile(new Tile(1, 1), _whitePlayer.Id);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.GameIsOver);
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.TimeOut);
	}

	[Test]
	public void WhenGameIsOver_BecauseOfAnyReason_BothClockShouldStop()
	{
		// Arrange
		var game = new GameWithTimeControl(15, new TimeControl(180, 0), _randomProvider, _dateTimeProvider);
		game.AddOpponent(_blackPlayer);
		game.AddOpponent(_whitePlayer);
		game.PlaceTile(new Tile(0, 0), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(0, 1), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(1, 1), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(0, 2), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(2, 2), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(0, 3), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(3, 3), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(0, 4), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(4, 4), game.NextMoveShouldMakePlayerId!);
		_dateTimeProvider.UtcNowInPosix.Returns(2000);

		// Assert
		game.GetRemainingTime(_blackPlayer.Id).Should().Be(180);
		game.GetRemainingTime(_whitePlayer.Id).Should().Be(180);
	}
}
