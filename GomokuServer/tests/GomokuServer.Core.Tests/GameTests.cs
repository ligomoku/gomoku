using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Validation;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Core.UnitTests;

public class GameTests
{
	private Game _game;
	private Profile _playerOne;
	private Profile _playerTwo;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;

	[SetUp]
	public void SetUp()
	{
		_playerOne = new Profile("Player1Id", "Player1UserName");
		_playerTwo = new Profile("Player2Id", "Player2UserName");

		_randomProvider = Substitute.For<IRandomProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);

		_dateTimeProvider = Substitute.For<IDateTimeProvider>();

		_game = new Game(15, _randomProvider, _dateTimeProvider);

		_game.AddOpponent(_playerOne);
		_game.AddOpponent(_playerTwo);
	}

	[Test]
	public void PlaceTile_ValidTilePlacement_ShouldReturnTrue()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _game.PlaceTile(tile, _game.Players!.Black!.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Winner.Should().BeNull();
	}

	[Test]
	public void PlaceTile_InvalidTilePlacement_ShouldReturnFalse()
	{
		// Arrange
		var tile = new Tile(20, 20);

		// Act
		var result = _game.PlaceTile(tile, _game.Players!.Black!.Id);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.TileIndexOutOfTheBoardRange);
	}

	[Test]
	public void PlaceTile_ForPositionWhereTileAlreadyExists_ShouldReturnFalse()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var firstPlacement = _game.PlaceTile(tile, _game.Players!.Black!.Id);
		var secondPlacement = _game.PlaceTile(tile, _game.Players!.White!.Id);

		// Assert
		firstPlacement.IsValid.Should().BeTrue();
		secondPlacement.IsValid.Should().BeFalse();
		secondPlacement.ValidationError.Should().Be(TilePlacementValidationError.TileAlreadyOcupied);
	}

	[Test]
	public void PlaceTile_SamePlayerMakesTwoMovesInARow_ShouldReturnFalse()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var firstPlacement = _game.PlaceTile(tile, _game.Players!.Black!.Id);
		var secondPlacement = _game.PlaceTile(tile, _game.Players!.Black.Id);

		// Assert
		firstPlacement.IsValid.Should().BeTrue();
		secondPlacement.IsValid.Should().BeFalse();
		secondPlacement.ValidationError.Should().Be(TilePlacementValidationError.OtherPlayerTurnNow);
	}

	[Test]
	public void PlaceTile_BlackPlayerWinsHorizontally_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_game.PlaceTile(new Tile(i, 7), _game.Players!.Black!.Id);
			_game.PlaceTile(new Tile(i, 8), _game.Players!.White!.Id);
		}

		// Act
		var result = _game.PlaceTile(new Tile(4, 7), _game.Players!.Black!.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Winner.Should().Be(_game.Players!.Black);
		_game.WinningSequence.Should().BeEquivalentTo(new[] {
			new Tile(0, 7),
			new Tile(1, 7),
			new Tile(2, 7),
			new Tile(3, 7),
			new Tile(4, 7)
		});

		_game.NextMoveShouldMakePlayerId.Should().BeNull();
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.MadeFiveInARow);
	}

	[Test]
	public void PlaceTile_BlackPlayerWinsVertically_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_game.PlaceTile(new Tile(7, i), _game.Players!.Black!.Id);
			_game.PlaceTile(new Tile(8, i), _game.Players!.White!.Id);
		}

		// Act
		var result = _game.PlaceTile(new Tile(7, 4), _game.Players!.Black!.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Winner.Should().Be(_game.Players!.Black);
		_game.WinningSequence.Should().BeEquivalentTo(new[] {
			new Tile(7, 0),
			new Tile(7, 1),
			new Tile(7, 2),
			new Tile(7, 3),
			new Tile(7, 4)
		});

		_game.NextMoveShouldMakePlayerId.Should().BeNull();
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.MadeFiveInARow);
	}

	[Test]
	public void PlaceTile_BlackPlayerWinsDiagonally_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		_game.PlaceTile(new Tile(0, 0), _game.Players!.Black!.Id);
		_game.PlaceTile(new Tile(5, 5), _game.Players!.White!.Id);
		_game.PlaceTile(new Tile(1, 1), _game.Players!.Black.Id);
		_game.PlaceTile(new Tile(6, 6), _game.Players!.White.Id);
		_game.PlaceTile(new Tile(2, 2), _game.Players!.Black.Id);
		_game.PlaceTile(new Tile(7, 7), _game.Players!.White.Id);
		_game.PlaceTile(new Tile(3, 3), _game.Players!.Black.Id);
		_game.PlaceTile(new Tile(8, 8), _game.Players!.White.Id);

		// Act
		var result = _game.PlaceTile(new Tile(4, 4), _game.Players!.Black.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Winner.Should().Be(_game.Players!.Black);
		_game.WinningSequence.Should().BeEquivalentTo(new[] {
			new Tile(0, 0),
			new Tile(1, 1),
			new Tile(2, 2),
			new Tile(3, 3),
			new Tile(4, 4)
		});

		_game.NextMoveShouldMakePlayerId.Should().BeNull();
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.MadeFiveInARow);
	}

	[Test]
	public void PlaceTile_NoWinnerAfterMove_ShouldReturnNullForWinner()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _game.PlaceTile(tile, _game.Players!.Black!.Id);

		// Assert
		_game.Winner.Should().BeNull();
	}

	[Test]
	public void PlaceTile_BeforePlayersJoin_ShouldReturnNotBothPlayerAreJoinedYetError()
	{
		// Arrange
		_game = new Game(15, _randomProvider, _dateTimeProvider);

		// Act
		var result = _game.PlaceTile(new Tile(7, 7), "nonExistentPlayerId");

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.NotBothPlayerAreJoinedYet);
	}

	[Test]
	public void PlaceTile_AfterGameIsWon_ShouldReturnGameOverError()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_game.PlaceTile(new Tile(i, 7), _game.Players!.Black!.Id);
			_game.PlaceTile(new Tile(i, 8), _game.Players!.White!.Id);
		}
		var winningMove = _game.PlaceTile(new Tile(4, 7), _game.Players!.Black!.Id);

		// Act
		var result = _game.PlaceTile(new Tile(9, 9), _game.Players!.White!.Id);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.GameIsOver);
		_game.Winner.Should().Be(_game.Players!.Black);
	}

	[Test]
	public void PlaceTile_AndMakeTie_ResultStatusAndReasonShouldBeCorrect()
	{
		// Arrage
		var game = new Game(1, _randomProvider, _dateTimeProvider);
		game.AddOpponent(new Profile("1", "Username1"));
		game.AddOpponent(new Profile("2", "Username2"));

		// Act
		game.PlaceTile(new Tile(0, 0), "1");

		// Assert
		game.Result.Should().Be(GameResult.Tie);
		game.Status.Should().Be(GameStatus.Completed);
		game.CompletionReason.Should().Be(CompletionReason.TieOnTheBoard);
	}

	[Test]
	public void AddPlayer_WhenBothPlacesAreTaken_ShouldReturnError()
	{
		// Arrange
		var playerThree = new Profile("Player3Id", "Player3UserName");

		// Act
		var result = _game.AddOpponent(playerThree);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(PlayerAddingValidationError.BothPlacesTakenAlready);
	}

	[Test]
	public void AddPlayer_SamePlayerAddedTwice_ShouldReturnSuccess()
	{
		// Arrange
		_game = new Game(15, _randomProvider, _dateTimeProvider);

		var player = new Profile("somePlayerId", "SomePlayerUserName");
		_game.AddOpponent(player);

		// Act
		var result = _game.AddOpponent(player);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(PlayerAddingValidationError.PlayerAlreadyAddedToGame);
	}

	[Test]
	public void CreateGame_WhenPlayersNotAdded_GameStatusShouldBeWaitingForPlayersToJoin()
	{
		// Arrange
		_game = new Game(15, _randomProvider, _dateTimeProvider);

		// Assert
		_game.Opponents.Count.Should().Be(0);
		_game.Players.Black.Should().BeNull();
		_game.Players.White.Should().BeNull();
		_game.Result.Should().Be(GameResult.NotCompletedYet);
		_game.Status.Should().Be(GameStatus.WaitingForPlayersToJoin);
		_game.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void CreateGame_WhenOnePlayersAdded_GameStatusShouldBeWaitingForPlayersToJoin()
	{
		// Arrange
		_game = new Game(15, _randomProvider, _dateTimeProvider);

		// Act
		_game.AddOpponent(new Profile("somePlayer1Id", "somePlayer1UserName"));

		// Assert
		_game.Opponents.Count.Should().Be(1);
		_game.Players.Black.Should().BeNull();
		_game.Players.White.Should().BeNull();
		_game.Result.Should().Be(GameResult.NotCompletedYet);
		_game.Status.Should().Be(GameStatus.WaitingForPlayersToJoin);
		_game.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void CreateGame_WhenBothPlayersAreAdded_GameStatus_ShouldBe_BothPlayersJoined()
	{
		// Arrange
		_game = new Game(15, _randomProvider, _dateTimeProvider);

		// Act
		_game.AddOpponent(new Profile("somePlayer1Id", "somePlayer1UserName"));
		_game.AddOpponent(new Profile("somePlayer2Id", "somePlayer2UserName"));

		// Assert
		_game.Opponents.Count().Should().Be(2);
		_game.Players.Black!.Id.Should().Be("somePlayer1Id");
		_game.Players.White!.Id.Should().Be("somePlayer2Id");
		_game.Result.Should().Be(GameResult.NotCompletedYet);
		_game.Status.Should().Be(GameStatus.BothPlayersJoined);
		_game.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void CreateGame_WhenBothPlayersAreAdded_AndOneMoveIsMade_GameStatus_ShouldBe_InProgress()
	{
		// Arrange
		_game = new Game(15, _randomProvider, _dateTimeProvider);
		_game.AddOpponent(new Profile("somePlayer1Id", "somePlayer1UserName"));
		_game.AddOpponent(new Profile("somePlayer2", "somePlayer2UserName"));

		// Act
		_game.PlaceTile(new Tile(0, 0), "somePlayer1Id");

		// Assert
		_game.Result.Should().Be(GameResult.NotCompletedYet);
		_game.Status.Should().Be(GameStatus.InProgress);
		_game.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void MakeMoves_MovesHistoryShouldBeCorrect()
	{
		// Act
		_game.PlaceTile(new Tile(0, 0), _playerOne.Id);
		_game.PlaceTile(new Tile(0, 1), _playerTwo.Id);
		_game.PlaceTile(new Tile(1, 1), _playerOne.Id);

		// Assert
		_game.MovesHistory.Count.Should().Be(3);
		_game.MovesHistory[1].X.Should().Be(0);
		_game.MovesHistory[1].Y.Should().Be(0);
		_game.MovesHistory[2].X.Should().Be(0);
		_game.MovesHistory[2].Y.Should().Be(1);
		_game.MovesHistory[3].X.Should().Be(1);
		_game.MovesHistory[3].Y.Should().Be(1);
	}

	[Test]
	public void EachPlayerMakeMoves_NextMovePlayerIdShouldBeCorrect()
	{
		// Assert 
		_game.NextMoveShouldMakePlayerId.Should().Be(_playerOne.Id);
		_game.Players!.Black!.Color.Should().Be(TileColor.Black);
		_game.Players!.White!.Color.Should().Be(TileColor.White);

		_game.PlaceTile(new Tile(0, 0), _playerOne.Id);
		_game.NextMoveShouldMakePlayerId.Should().Be(_playerTwo.Id);

		_game.PlaceTile(new Tile(1, 1), _playerTwo.Id);
		_game.NextMoveShouldMakePlayerId.Should().Be(_playerOne.Id);
	}
}
