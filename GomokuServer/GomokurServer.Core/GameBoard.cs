namespace GomokuServer.Core;

public class GameBoard
{
	private readonly int _boardSize;
	private readonly string[,] _board;

	public GameBoard(int boardSize)
	{
		_boardSize = boardSize;
		_board = new string[_boardSize, _boardSize];
	}

	public string? LastPlacementById { get; private set; }

	public TilePlacementResult PlaceTile(Tile tile, string playerId)
	{
		if (playerId == LastPlacementById)
		{
			return new()
			{
				IsPlacementValid = false,
				ValidationError = TilePlacementValidationError.SamePlayerMadeSecondMoveInARow
			};
		}

		if (tile.X < 0 || tile.X >= _boardSize || tile.Y < 0 || tile.Y >= _boardSize)
		{
			return new()
			{
				IsPlacementValid = false,
				ValidationError = TilePlacementValidationError.TileIndexOutOfTheBoardRange
			};
		}

		if (_board[tile.X, tile.Y] != null)
		{
			return new()
			{
				IsPlacementValid = false,
				ValidationError = TilePlacementValidationError.TileAlreadyOcupied
			};
		}

		_board[tile.X, tile.Y] = playerId;
		LastPlacementById = playerId;

		return new()
		{
			WinnerId = CalculateWinner(tile, playerId),
			IsPlacementValid = true,
		};
	}

	private string? CalculateWinner(Tile lastMove, string playerId)
	{
		if (CheckDirection(lastMove.X, lastMove.Y, 1, 0, playerId) ||
			CheckDirection(lastMove.X, lastMove.Y, 0, 1, playerId) ||
			CheckDirection(lastMove.X, lastMove.Y, 1, 1, playerId) ||
			CheckDirection(lastMove.X, lastMove.Y, 1, -1, playerId))
		{
			return playerId;
		}

		return null;
	}

	private bool CheckDirection(int startX, int startY, int xDirection, int yDirection, string playerId)
	{
		int consecutiveCount = 1;

		consecutiveCount += CountConsecutiveTiles(startX, startY, xDirection, yDirection, playerId);
		consecutiveCount += CountConsecutiveTiles(startX, startY, -xDirection, -yDirection, playerId);

		return consecutiveCount >= 5;
	}

	private int CountConsecutiveTiles(int startX, int startY, int xDirection, int yDirection, string playerId)
	{
		int consecutiveCount = 0;
		int currentX = startX + xDirection;
		int currentY = startY + yDirection;

		while (currentX >= 0 && currentX < _boardSize &&
			   currentY >= 0 && currentY < _boardSize &&
			   _board[currentX, currentY] == playerId)
		{
			consecutiveCount++;
			currentX += xDirection;
			currentY += yDirection;
		}

		return consecutiveCount;
	}
}
