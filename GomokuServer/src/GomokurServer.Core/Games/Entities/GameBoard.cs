﻿using System.Text;

using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Extensions;
using GomokuServer.Core.Games.Results;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Entities;

public class GameBoard
{
	private readonly int _boardSize;
	private readonly string?[,] _board;
	private int _movesCount = 0;

	public GameBoard(int boardSize)
	{
		_boardSize = boardSize;
		_board = new string[_boardSize, _boardSize];
		NextTileColor = TileColor.Black;
	}

	public TileColor NextTileColor { get; private set; }

	public string PositionInGENFormat
	{
		get
		{
			var gen = new StringBuilder();

			for (var i = 0; i < _boardSize; i++)
			{
				var row = new StringBuilder();

				for (var j = 0; j < _boardSize; j++)
				{
					row.Append(GetGENCharFromColor(_board[i, j]));
				}

				gen.Append($"{row}/");
			}

			gen.Append($"{NextTileColor.GetChar()}/{_movesCount}");

			return gen.ToString();
		}
	}

	public PlaceTileActionResult PlaceNewTile(Tile tile)
	{
		if (tile.X < 0 || tile.X >= _boardSize || tile.Y < 0 || tile.Y >= _boardSize)
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlaceTileActionValidationError.TileIndexOutOfTheBoardRange,
				ErrorDetails = "Tile index out of the range"
			};
		}

		if (_board[tile.X, tile.Y] != null)
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlaceTileActionValidationError.TileAlreadyOcupied,
				ErrorDetails = "Tile already ocupied"
			};
		}

		var newTileColor = NextTileColor;
		var colorString = newTileColor.GetString();
		_board[tile.X, tile.Y] = colorString;

		NextTileColor = newTileColor == TileColor.Black ? TileColor.White : TileColor.Black;
		_movesCount++;

		var winningSequence = CalculateWinningSequence(tile, colorString);

		bool isTieSituation = false;
		if (winningSequence == null && _movesCount == _boardSize * _boardSize)
		{
			isTieSituation = true;
		}

		return new()
		{
			IsValid = true,
			IsTieSituationAfterMove = isTieSituation,
			WinningSequence = winningSequence
		};
	}

	public RemoveTileActionResult RemoveTile(Tile tile)
	{
		if (tile.X < 0 || tile.X >= _boardSize || tile.Y < 0 || tile.Y >= _boardSize)
		{
			return new()
			{
				IsValid = false,
				ValidationError = RemoveTileValidationError.TileIndexOutOfTheBoardRange,
				ErrorDetails = "Tile index out of the range"
			};
		}

		if (_movesCount == 0)
		{
			return new()
			{
				IsValid = true,
			};
		}

		_board[tile.X, tile.Y] = null;
		NextTileColor = NextTileColor == TileColor.Black ? TileColor.White : TileColor.Black;

		return new()
		{
			IsValid = true,
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

	public static string GetEmptyBoardGEN(int boardSize)
	{
		var gen = new StringBuilder();

		for (var i = 0; i < boardSize; i++)
		{
			var row = new StringBuilder();

			for (var j = 0; j < boardSize; j++)
			{
				row.Append('.');
			}

			gen.Append($"{row}/");
		}

		gen.Append("b/0");

		return gen.ToString();
	}

	private static string GetGENCharFromColor(string? color)
	{
		return color switch
		{
			"black" => "X",
			"white" => "O",
			_ => "."
		};
	}
}
