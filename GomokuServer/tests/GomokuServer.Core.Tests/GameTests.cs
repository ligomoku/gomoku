using GomokuServer.Core.Entities;
using GomokuServer.Core.Interfaces;
using GomokuServer.Core.Validation;

using NSubstitute;

namespace GomokuServer.Core.UnitTests;

public class GameTests
{
	private Game _game;
	private Player _playerOne;
	private Player _playerTwo;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;

	[SetUp]
	public void SetUp()
	{
		_playerOne = new Player("Player1Id", "Player1UserName");
		_playerTwo = new Player("Player2Id", "Player2UserName");
		var gameBoard = new GameBoard(15);

		_randomProvider = Substitute.For<IRandomProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);

		_dateTimeProvider = Substitute.For<IDateTimeProvider>();

		_game = new Game(gameBoard, _randomProvider, _dateTimeProvider);

		_game.AddPlayer(_playerOne);
		_game.AddPlayer(_playerTwo);
	}

	[Test]
	public void PlaceTile_ValidTilePlacement_ShouldReturnTrue()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _game.PlaceTile(tile, _game.PlayerOne!.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		result.Winner.Should().BeNull();
	}

	[Test]
	public void PlaceTile_InvalidTilePlacement_ShouldReturnFalse()
	{
		// Arrange
		var tile = new Tile(20, 20);

		// Act
		var result = _game.PlaceTile(tile, _game.PlayerOne!.Id);

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
		var firstPlacement = _game.PlaceTile(tile, _game.PlayerOne!.Id);
		var secondPlacement = _game.PlaceTile(tile, _game.PlayerTwo!.Id);

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
		var firstPlacement = _game.PlaceTile(tile, _game.PlayerOne!.Id);
		var secondPlacement = _game.PlaceTile(tile, _game.PlayerOne.Id);

		// Assert
		firstPlacement.IsValid.Should().BeTrue();
		secondPlacement.IsValid.Should().BeFalse();
		secondPlacement.ValidationError.Should().Be(TilePlacementValidationError.OtherPlayerTurnNow);
	}

	[Test]
	public void PlaceTile_PlayerWinsHorizontally_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_game.PlaceTile(new Tile(i, 7), _game.PlayerOne!.Id);
			_game.PlaceTile(new Tile(i, 8), _game.PlayerTwo!.Id);
		}

		// Act
		var result = _game.PlaceTile(new Tile(4, 7), _game.PlayerOne!.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		result.Winner.Should().Be(_game.PlayerOne);
		result.WinningSequence.Should().BeEquivalentTo(new[] {
			new Tile(0, 7),
			new Tile(1, 7),
			new Tile(2, 7),
			new Tile(3, 7),
			new Tile(4, 7)
		});
		_game.NextMoveShouldMakePlayerId.Should().BeNull();
	}

	[Test]
	public void PlaceTile_PlayerWinsVertically_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_game.PlaceTile(new Tile(7, i), _game.PlayerOne!.Id);
			_game.PlaceTile(new Tile(8, i), _game.PlayerTwo!.Id);
		}

		// Act
		var result = _game.PlaceTile(new Tile(7, 4), _game.PlayerOne!.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		result.Winner.Should().Be(_game.PlayerOne);
		result.WinningSequence.Should().BeEquivalentTo(new[] {
			new Tile(7, 0),
			new Tile(7, 1),
			new Tile(7, 2),
			new Tile(7, 3),
			new Tile(7, 4)
		});
		_game.NextMoveShouldMakePlayerId.Should().BeNull();
	}

	[Test]
	public void PlaceTile_PlayerWinsDiagonally_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		_game.PlaceTile(new Tile(0, 0), _game.PlayerOne!.Id);
		_game.PlaceTile(new Tile(5, 5), _game.PlayerTwo!.Id);
		_game.PlaceTile(new Tile(1, 1), _game.PlayerOne.Id);
		_game.PlaceTile(new Tile(6, 6), _game.PlayerTwo.Id);
		_game.PlaceTile(new Tile(2, 2), _game.PlayerOne.Id);
		_game.PlaceTile(new Tile(7, 7), _game.PlayerTwo.Id);
		_game.PlaceTile(new Tile(3, 3), _game.PlayerOne.Id);
		_game.PlaceTile(new Tile(8, 8), _game.PlayerTwo.Id);

		// Act
		var result = _game.PlaceTile(new Tile(4, 4), _game.PlayerOne.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		result.Winner.Should().Be(_game.PlayerOne);
		result.WinningSequence.Should().BeEquivalentTo(new[] {
			new Tile(0, 0),
			new Tile(1, 1),
			new Tile(2, 2),
			new Tile(3, 3),
			new Tile(4, 4)
		});
		_game.NextMoveShouldMakePlayerId.Should().BeNull();
	}

	[Test]
	public void PlaceTile_NoWinnerAfterMove_ShouldReturnNullForWinner()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _game.PlaceTile(tile, _game.PlayerOne!.Id);

		// Assert
		result.Winner.Should().BeNull();
	}

	[Test]
	public void PlaceTile_BeforePlayersJoin_ShouldReturnNotBothPlayerAreJoinedYetError()
	{
		// Arrange
		var gameBoard = new GameBoard(15);
		_game = new Game(gameBoard, _randomProvider, _dateTimeProvider);

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
			_game.PlaceTile(new Tile(i, 7), _game.PlayerOne!.Id);
			_game.PlaceTile(new Tile(i, 8), _game.PlayerTwo!.Id);
		}
		var winningMove = _game.PlaceTile(new Tile(4, 7), _game.PlayerOne!.Id);

		// Act
		var result = _game.PlaceTile(new Tile(9, 9), _game.PlayerTwo!.Id);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.GameIsOver);
		result.Winner.Should().Be(_game.PlayerOne);
	}

	[Test]
	public void AddPlayer_WhenBothPlacesAreTaken_ShouldReturnError()
	{
		// Arrange
		var playerThree = new Player("Player3Id", "Player3UserName");

		// Act
		var result = _game.AddPlayer(playerThree);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(PlayerAddingValidationError.BothPlacesTakenAlready);
	}

	[Test]
	public void AddPlayer_SamePlayerAddedTwice_ShouldReturnSuccess()
	{
		// Arrange
		var gameBoard = new GameBoard(15);
		_game = new Game(gameBoard, _randomProvider, _dateTimeProvider);

		var player = new Player("somePlayerId", "SomePlayerUserName");
		_game.AddPlayer(player);

		// Act
		var result = _game.AddPlayer(player);

		// Assert
		result.IsValid.Should().BeTrue();
	}

	[Test]
	public void CreateGame_WhenPlayersNotAdded_GameStartedShouldBeFalse()
	{
		// Arrange
		_game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);

		// Assert
		_game.IsGameStarted.Should().BeFalse();
	}

	[Test]
	public void CreateGame_WhenBothPlayersAreAdded_HasBothPlayersJoinedShouldBeTrue_IsGameStartedShouldBeFalse()
	{
		// Arrange
		_game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
		_game.AddPlayer(new Player("somePlayer1Id", "somePlayer1UserName"));
		_game.AddPlayer(new Player("somePlayer2", "somePlayer2UserName"));

		// Assert
		_game.HasBothPlayersJoined.Should().BeTrue();
		_game.IsGameStarted.Should().BeFalse();
	}

	[Test]
	public void CreateGame_WhenBothPlayersAreAdded_AndOneMoveIsMade_HasBothPlayersJoinedShouldBeTrue_IsGameStartedShouldBeTrue()
	{
		// Arrange
		_game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
		_game.AddPlayer(new Player("somePlayer1Id", "somePlayer1UserName"));
		_game.AddPlayer(new Player("somePlayer2", "somePlayer2UserName"));

		// Act
		_game.PlaceTile(new Tile(0, 0), "somePlayer1Id");

		// Assert
		_game.HasBothPlayersJoined.Should().BeTrue();
		_game.IsGameStarted.Should().BeTrue();
	}

	[Test]
	public void MakeMoves_MovesNumbersShouldBeCorrect()
	{
		// Act
		_game.PlaceTile(new Tile(0, 0), _playerOne.Id);
		_game.PlaceTile(new Tile(0, 1), _playerTwo.Id);
		_game.PlaceTile(new Tile(1, 1), _playerOne.Id);

		// Assert
		var playerMoves = _game.PlayersMoves.Values.ToList();
		playerMoves.Count.Should().Be(3);
		playerMoves[0].MoveNumber.Should().Be(1);
		playerMoves[1].MoveNumber.Should().Be(1);
		playerMoves[2].MoveNumber.Should().Be(2);
	}

	[Test]
	public void EachPlayerMakeMoves_NextMovePlayerIdShouldBeCorrect()
	{
		// Assert 
		_game.NextMoveShouldMakePlayerId.Should().Be(_playerOne.Id);
		_game.PlayerOne!.Color.Should().Be(TileColor.Black);
		_game.PlayerTwo!.Color.Should().Be(TileColor.White);

		_game.PlaceTile(new Tile(0, 0), _playerOne.Id);
		_game.NextMoveShouldMakePlayerId.Should().Be(_playerTwo.Id);

		_game.PlaceTile(new Tile(1, 1), _playerTwo.Id);
		_game.NextMoveShouldMakePlayerId.Should().Be(_playerOne.Id);
	}
}
