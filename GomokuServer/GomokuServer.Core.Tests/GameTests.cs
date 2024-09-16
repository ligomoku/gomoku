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
			GameId = "TestGame",
			PlayerOne = playerOne,
			PlayerTwo = playerTwo,
			GameBoard = gameBoard
		};
	}

	[Test]
	public void PlaceTile_ValidTilePlacement_ShouldReturnTrue()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _game.PlaceTile(tile, _game.PlayerOne.Id);

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
		var result = _game.PlaceTile(tile, _game.PlayerOne.Id);

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
		var firstPlacement = _game.PlaceTile(tile, _game.PlayerOne.Id);
		var secondPlacement = _game.PlaceTile(tile, _game.PlayerTwo.Id);

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
		var firstPlacement = _game.PlaceTile(tile, _game.PlayerOne.Id);
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
			_game.PlaceTile(new Tile(i, 7), _game.PlayerOne.Id);
			_game.PlaceTile(new Tile(i, 8), _game.PlayerTwo.Id);
		}

		// Act
		var result = _game.PlaceTile(new Tile(4, 7), _game.PlayerOne.Id);

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
			_game.PlaceTile(new Tile(7, i), _game.PlayerOne.Id);
			_game.PlaceTile(new Tile(8, i), _game.PlayerTwo.Id);
		}

		// Act
		var result = _game.PlaceTile(new Tile(7, 4), _game.PlayerOne.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		result.WinnerId.Should().Be(_game.PlayerOne.Id);
	}

	[Test]
	public void PlaceTile_PlayerWinsDiagonally_ShouldDeclareWinner()
	{
		// Arrange
		_game.PlaceTile(new Tile(0, 0), _game.PlayerOne.Id);
		_game.PlaceTile(new Tile(5, 5), _game.PlayerTwo.Id);
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
		var result = _game.PlaceTile(tile, _game.PlayerOne.Id);

		// Assert
		result.WinnerId.Should().BeNull();
	}
}
