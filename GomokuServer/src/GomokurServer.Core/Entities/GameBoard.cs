using GomokuServer.Core.Results;
using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Entities;

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
				IsValid = false,
				ValidationError = TilePlacementValidationError.SamePlayerMadeSecondMoveInARow
			};
		}

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

		_board[tile.X, tile.Y] = playerId;
		LastPlacementById = playerId;

		var winnerCalculationResult = CalculateWinner(tile, playerId);

		return winnerCalculationResult == null
		? new()
		{
			IsValid = true,
		}
		: new()
		{
			IsValid = true,
			WinnerId = winnerCalculationResult.WinnerId,
			WinningRow = winnerCalculationResult.WinningRow
		};
	}

	private WinnerCalculationResult? CalculateWinner(Tile lastMove, string playerId)
	{
		List<Tile>? winningTiles;

		if ((winningTiles = GetWinningRowInDirection(lastMove.X, lastMove.Y, 1, 0, playerId))?.Count >= 5 ||
			(winningTiles = GetWinningRowInDirection(lastMove.X, lastMove.Y, 0, 1, playerId))?.Count >= 5 ||
			(winningTiles = GetWinningRowInDirection(lastMove.X, lastMove.Y, 1, 1, playerId))?.Count >= 5 ||
			(winningTiles = GetWinningRowInDirection(lastMove.X, lastMove.Y, 1, -1, playerId))?.Count >= 5)
		{
			return new WinnerCalculationResult
			{
				WinnerId = playerId,
				WinningRow = winningTiles
			};
		}

		return null;
	}

	private List<Tile>? GetWinningRowInDirection(int startX, int startY, int xDirection, int yDirection, string playerId)
	{
		List<Tile> winningRow =
		[
			new Tile(startX, startY),
			.. CollectConsecutiveTiles(startX, startY, xDirection, yDirection, playerId),
			.. CollectConsecutiveTiles(startX, startY, -xDirection, -yDirection, playerId),
		];

		return winningRow.Count >= 5 ? winningRow : null;
	}

	private List<Tile> CollectConsecutiveTiles(int startX, int startY, int xDirection, int yDirection, string playerId)
	{
		List<Tile> tiles = [];
		int currentX = startX + xDirection;
		int currentY = startY + yDirection;

		while (currentX >= 0 && currentX < _boardSize &&
			   currentY >= 0 && currentY < _boardSize &&
			   _board[currentX, currentY] == playerId)
		{
			tiles.Add(new Tile(currentX, currentY));
			currentX += xDirection;
			currentY += yDirection;
		}

		return tiles;
	}
}
