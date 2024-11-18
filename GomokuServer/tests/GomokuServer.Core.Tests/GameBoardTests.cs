using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.UnitTests;

public class GameBoardTests
{
	private GameBoard _gameBoard;

	[SetUp]
	public void SetUp()
	{
		_gameBoard = new GameBoard(15);
	}

	[Test]
	public void PlaceNewTile_ValidTilePlacement_ShouldReturnValidResult()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _gameBoard.PlaceNewTile(tile);

		// Assert
		result.IsValid.Should().BeTrue();
		_gameBoard.NextTileColor.Should().Be(TileColor.White);
		result.WinningSequence.Should().BeNull();
	}

	[Test]
	public void PlaceNewTile_SecondTilePlaced_ShouldSwitchToNextColor()
	{
		// Assert
		var firstResult = _gameBoard.PlaceNewTile(new Tile(7, 7));
		firstResult.IsValid.Should().BeTrue();
		_gameBoard.NextTileColor.Should().Be(TileColor.White);

		var secondResult = _gameBoard.PlaceNewTile(new Tile(7, 8));
		secondResult.IsValid.Should().BeTrue();
		_gameBoard.NextTileColor.Should().Be(TileColor.Black);
	}

	[Test]
	public void PlaceNewTile_InvalidTilePlacement_OutOfBoard_ShouldReturnError()
	{
		// Arrange
		var tile = new Tile(20, 20);

		// Act
		var result = _gameBoard.PlaceNewTile(tile);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(PlaceTileActionValidationError.TileIndexOutOfTheBoardRange);
	}

	[Test]
	public void PlaceNewTile_TileAlreadyOccupied_ShouldReturnError()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var firstPlacement = _gameBoard.PlaceNewTile(tile);
		var secondPlacement = _gameBoard.PlaceNewTile(tile);

		// Assert
		firstPlacement.IsValid.Should().BeTrue();
		secondPlacement.IsValid.Should().BeFalse();
		secondPlacement.ValidationError.Should().Be(PlaceTileActionValidationError.TileAlreadyOcupied);
	}

	[Test]
	public void PlaceNewTile_WinningHorizontalSequence_ShouldReturnWinningTiles()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_gameBoard.PlaceNewTile(new Tile(i, 7));
			_gameBoard.PlaceNewTile(new Tile(i, 8));
		}

		// Act
		var result = _gameBoard.PlaceNewTile(new Tile(4, 7));

		// Assert
		result.IsValid.Should().BeTrue();
		result.WinningSequence.Should().NotBeNull();
		result.WinningSequence.Should().BeEquivalentTo(new[]
		{
			new Tile(0, 7),
			new Tile(1, 7),
			new Tile(2, 7),
			new Tile(3, 7),
			new Tile(4, 7)
		});
	}

	[Test]
	public void PlaceNewTile_WinningVerticalSequence_ShouldReturnWinningTiles()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_gameBoard.PlaceNewTile(new Tile(7, i));
			_gameBoard.PlaceNewTile(new Tile(8, i));
		}

		// Act
		var result = _gameBoard.PlaceNewTile(new Tile(7, 4));

		// Assert
		result.IsValid.Should().BeTrue();
		result.WinningSequence.Should().NotBeNull();
		result.WinningSequence.Should().BeEquivalentTo(new[]
		{
			new Tile(7, 0),
			new Tile(7, 1),
			new Tile(7, 2),
			new Tile(7, 3),
			new Tile(7, 4)
		});
	}

	[Test]
	public void PlaceNewTile_WinningDiagonalSequence_ShouldReturnWinningTiles()
	{
		// Arrange
		_gameBoard.PlaceNewTile(new Tile(0, 0));
		_gameBoard.PlaceNewTile(new Tile(0, 1));
		_gameBoard.PlaceNewTile(new Tile(1, 1));
		_gameBoard.PlaceNewTile(new Tile(1, 2));
		_gameBoard.PlaceNewTile(new Tile(2, 2));
		_gameBoard.PlaceNewTile(new Tile(2, 3));
		_gameBoard.PlaceNewTile(new Tile(3, 3));
		_gameBoard.PlaceNewTile(new Tile(3, 4));

		// Act
		var result = _gameBoard.PlaceNewTile(new Tile(4, 4));

		// Assert
		result.IsValid.Should().BeTrue();
		result.WinningSequence.Should().NotBeNull();
		result.WinningSequence.Should().BeEquivalentTo(new[]
		{
			new Tile(0, 0),
			new Tile(1, 1),
			new Tile(2, 2),
			new Tile(3, 3),
			new Tile(4, 4)
		});
	}

	[Test]
	public void PlaceNewTile_NoWinningSequence_ShouldReturnNull()
	{
		// Arrange
		_gameBoard.PlaceNewTile(new Tile(0, 0));
		_gameBoard.PlaceNewTile(new Tile(0, 1));
		_gameBoard.PlaceNewTile(new Tile(1, 1));
		_gameBoard.PlaceNewTile(new Tile(1, 2));

		// Act
		var result = _gameBoard.PlaceNewTile(new Tile(2, 2));

		// Assert
		result.IsValid.Should().BeTrue();
		result.WinningSequence.Should().BeNull();
	}

	[Test]
	public void PlaceNewTile_BlackWon_ShouldSetCorrectResult()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_gameBoard.PlaceNewTile(new Tile(7, i));
			_gameBoard.PlaceNewTile(new Tile(8, i));
		}

		// Act
		var result = _gameBoard.PlaceNewTile(new Tile(7, 4));

		// Assert
		result.IsValid.Should().BeTrue();
		result.IsTieSituationAfterMove.Should().BeFalse();
	}

	[Test]
	public void PlaceNewTile_WhiteWon_ShouldSetCorrectResult()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_gameBoard.PlaceNewTile(new Tile(7, i));
			_gameBoard.PlaceNewTile(new Tile(8, i));
		}

		// Act
		_gameBoard.PlaceNewTile(new Tile(12, 12));
		var result = _gameBoard.PlaceNewTile(new Tile(8, 4));

		// Assert
		result.IsValid.Should().BeTrue();
		result.IsTieSituationAfterMove.Should().BeFalse();
	}

	[Test]
	public void PlaceNewTile_BoardIsOverflowed_AndNoWinningSequence_GameResultShouldBeTie()
	{
		// Arrange
		var gameBoard = new GameBoard(2);

		// Act
		gameBoard.PlaceNewTile(new Tile(0, 0));
		gameBoard.PlaceNewTile(new Tile(0, 1));
		gameBoard.PlaceNewTile(new Tile(1, 0));
		var result = gameBoard.PlaceNewTile(new Tile(1, 1));

		// Assert
		result.IsValid.Should().BeTrue();
		result.WinningSequence.Should().BeNull();
		result.IsTieSituationAfterMove.Should().BeTrue();
	}

	[Test]
	public void RemoveTile_WhenMovesAreMade_ShouldRemoveTile()
	{
		// Arrange
		_gameBoard.PlaceNewTile(new(1, 1));
		_gameBoard.NextTileColor.Should().Be(TileColor.White);

		// Act
		var removeResult = _gameBoard.RemoveTile(new(1, 1));

		// Assert
		removeResult.IsValid.Should().BeTrue();
		_gameBoard.NextTileColor.Should().Be(TileColor.Black);
	}

	[Test]
	public void RemoveTile_WhenMovesAreNotMade_ShouldBeValid()
	{
		// Act
		var removeResult = _gameBoard.RemoveTile(new(1, 1));

		// Assert
		removeResult.IsValid.Should().BeTrue();
		_gameBoard.NextTileColor.Should().Be(TileColor.Black);
	}

	[Test]
	public void GenerateGENFormat_ShouldBeCorrect()
	{
		// Arrange
		var board = new GameBoard(5);
		board.PlaceNewTile(new Tile(0, 0));
		board.PlaceNewTile(new Tile(1, 1));
		board.PlaceNewTile(new Tile(2, 2));
		board.PlaceNewTile(new Tile(3, 3));
		board.PlaceNewTile(new Tile(4, 4));
		board.PlaceNewTile(new Tile(5, 5));

		// Act
		var gen = board.PositionInGENFormat;

		// Assert
		var expectedGen = "X..../.O.../..X../...O./....X/w/5";
		gen.Should().Be(expectedGen);
	}
}
