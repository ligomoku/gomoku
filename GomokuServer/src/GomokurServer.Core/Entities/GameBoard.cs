using GomokuServer.Core.Results;
using GomokuServer.Core.Validation;
using GomokuServer.Utils.Extensions;

namespace GomokuServer.Core.Entities;

public class GameBoard
{
	private readonly int _boardSize;
	private readonly string[,] _board;

	public GameBoard(int boardSize)
	{
		_boardSize = boardSize;
		_board = new string[_boardSize, _boardSize];
		NextTileColor = TileColor.Black;
	}

	public TileColor NextTileColor { get; private set; }

	public BoardTilePlacementResult PlaceTile(Tile tile, TileColor newTileColor)
	{
		if (tile.X < 0 || tile.X >= _boardSize || tile.Y < 0 || tile.Y >= _boardSize)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.TileIndexOutOfTheBoardRange
			};
		}

		if (_board[tile.X, tile.Y] != null)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.TileAlreadyOcupied
			};
		}

		if (newTileColor != NextTileColor)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.OtherPlayerTurnNow
			};
		}

		var colorString = newTileColor.ToString().ToCamelCase();
		_board[tile.X, tile.Y] = colorString;

		NextTileColor = newTileColor == TileColor.Black ? TileColor.White : TileColor.Black;

		return new()
		{
			IsValid = true,
			PlacedTileColor = newTileColor,
			WinningSequence = CalculateWinningSequence(tile, colorString)
		};
	}

	private List<Tile>? CalculateWinningSequence(Tile lastMove, string color)
	{
		List<Tile>? winningSequence;

		if ((winningSequence = GetWinningSequenceInDirection(lastMove.X, lastMove.Y, 1, 0, color))?.Count >= 5 ||
			(winningSequence = GetWinningSequenceInDirection(lastMove.X, lastMove.Y, 0, 1, color))?.Count >= 5 ||
			(winningSequence = GetWinningSequenceInDirection(lastMove.X, lastMove.Y, 1, 1, color))?.Count >= 5 ||
			(winningSequence = GetWinningSequenceInDirection(lastMove.X, lastMove.Y, 1, -1, color))?.Count >= 5)
		{
			return winningSequence;
		}

		return null;
	}

	private List<Tile>? GetWinningSequenceInDirection(int startX, int startY, int xDirection, int yDirection, string color)
	{
		List<Tile> winningSequence =
		[
			new Tile(startX, startY),
			.. CollectConsecutiveTiles(startX, startY, xDirection, yDirection, color),
			.. CollectConsecutiveTiles(startX, startY, -xDirection, -yDirection, color),
		];

		return winningSequence.Count >= 5 ? winningSequence : null;
	}

	private List<Tile> CollectConsecutiveTiles(int startX, int startY, int xDirection, int yDirection, string color)
	{
		List<Tile> tiles = [];
		int currentX = startX + xDirection;
		int currentY = startY + yDirection;

		while (currentX >= 0 && currentX < _boardSize &&
			   currentY >= 0 && currentY < _boardSize &&
			   _board[currentX, currentY] == color)
		{
			tiles.Add(new Tile(currentX, currentY));
			currentX += xDirection;
			currentY += yDirection;
		}

		return tiles;
	}
}
