using GomokuServer.Core.Entities;
using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Tests;

public class GameTests
{
	private Game _game;

	[SetUp]
	public void SetUp()
	{
		var playerOne = new Player("Player1");
		var playerTwo = new Player("Player2");
		var gameBoard = new GameBoard(15);

		_game = new Game
		{
			GameBoard = gameBoard
		};

		_game.AddPlayer(playerOne);
		_game.AddPlayer(playerTwo);
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
		result.WinnerId.Should().BeNull();
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
		secondPlacement.ValidationError.Should().Be(TilePlacementValidationError.SamePlayerMadeSecondMoveInARow);
	}

	[Test]
	public void PlaceTile_PlayerWinsHorizontally_ShouldDeclareWinner()
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
		result.WinnerId.Should().Be(_game.PlayerOne.Id);
	}

	[Test]
	public void PlaceTile_PlayerWinsVertically_ShouldDeclareWinner()
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
		result.WinnerId.Should().Be(_game.PlayerOne.Id);
	}

	[Test]
	public void PlaceTile_PlayerWinsDiagonally_ShouldDeclareWinner()
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
		result.WinnerId.Should().Be(_game.PlayerOne.Id);
	}

	[Test]
	public void PlaceTile_NoWinnerAfterMove_ShouldReturnNullForWinner()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _game.PlaceTile(tile, _game.PlayerOne!.Id);

		// Assert
		result.WinnerId.Should().BeNull();
	}

	[Test]
	public void PlaceTile_BeforeGameStarts_ShouldReturnGameNotStartedError()
	{
		// Arrange
		var gameBoard = new GameBoard(15);
		_game = new Game
		{
			GameBoard = gameBoard
		};

		// Act
		var result = _game.PlaceTile(new Tile(7, 7), "nonExistentPlayerId");

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.GameNotStartedYet);
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
		result.WinnerId.Should().Be(_game.PlayerOne.Id);
	}

	[Test]
	public void AddPlayer_WhenBothPlacesAreTaken_ShouldReturnError()
	{
		// Arrange
		var playerThree = new Player("Player3");

		// Act
		var result = _game.AddPlayer(playerThree);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(PlayerAddingValidationError.BothPlacesTakenAlready);
	}

	[Test]
	public void AddPlayer_SamePlayerAddedTwice_ShouldReturnPlayerAlreadyAddedError()
	{
		// Arrange
		var gameBoard = new GameBoard(15);
		_game = new Game
		{
			GameBoard = gameBoard
		};
		var player = new Player("somePlayer");
		_game.AddPlayer(player);

		// Act
		var result = _game.AddPlayer(player);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(PlayerAddingValidationError.PlayerAlreadyAddedToGame);
	}

	[Test]
	public void CreateGame_WhenPlayersNotAdded_GameStartedShouldBeFalse()
	{
		// Arrange
		_game = new Game
		{
			GameBoard = new GameBoard(15)
		};

		// Assert
		_game.IsGameStarted.Should().BeFalse();
	}

	[Test]
	public void CreateGame_WhenBothPlayersAreAdded_GameStartedShouldBeTrue()
	{
		// Arrange
		_game = new Game
		{
			GameBoard = new GameBoard(15)
		};
		_game.AddPlayer(new Player("somePlayer1"));
		_game.AddPlayer(new Player("somePlayer2"));

		// Assert
		_game.IsGameStarted.Should().BeTrue();
	}
}
