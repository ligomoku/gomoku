﻿using GomokuServer.Core.Entities;
using GomokuServer.Core.Validation;

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
		result.PlacedTileColor.Should().Be(TileColor.Black);
		result.WinningSequence.Should().BeNull();
	}

	[Test]
	public void PlaceNewTile_SecondTilePlaced_ShouldSwitchToNextColor()
	{
		// Arrange
		var firstTile = new Tile(7, 7);
		var secondTile = new Tile(7, 8);

		// Act
		var firstResult = _gameBoard.PlaceNewTile(firstTile);
		var secondResult = _gameBoard.PlaceNewTile(secondTile);

		// Assert
		firstResult.IsValid.Should().BeTrue();
		firstResult.PlacedTileColor.Should().Be(TileColor.Black);

		secondResult.IsValid.Should().BeTrue();
		secondResult.PlacedTileColor.Should().Be(TileColor.White);
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
		result.ValidationError.Should().Be(TilePlacementValidationError.TileIndexOutOfTheBoardRange);
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
		secondPlacement.ValidationError.Should().Be(TilePlacementValidationError.TileAlreadyOcupied);
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
}