﻿using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Extensions;
using GomokuServer.Core.Games.Results;
using GomokuServer.Core.Games.Validations;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Core.Games.Entities;

public class Game
{
	private readonly Dictionary<int, Tile> _movesHistory = new();
	private readonly GameBoard _gameBoard;
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public Game(int boardSize, IRandomProvider randomProvider, IDateTimeProvider dateTimeProvider)
	{
		_gameBoard = new GameBoard(boardSize);
		_randomProvider = randomProvider;
		_dateTimeProvider = dateTimeProvider;

		BoardSize = boardSize;
		Opponents = new();
		Players = new();
		CreatedAt = _dateTimeProvider.UtcNow;
		Status = GameStatus.WaitingForPlayersToJoin;
		Result = GameResult.NotCompletedYet;
	}

	public int BoardSize { get; init; }

	public string GameId { get; } = Guid.NewGuid().ToString();

	public DateTime CreatedAt { get; init; }

	public IReadOnlyDictionary<int, Tile> MovesHistory => _movesHistory.AsReadOnly();

	public List<Profile> Opponents { get; init; }

	public Players Players { get; init; }

	public GameStatus Status { get; protected set; }

	public GameResult Result { get; protected set; }

	public CompletionReason CompletionReason { get; protected set; }

	public string? NextMoveShouldMakePlayerId { get; private set; }

	public Player? Winner { get; protected set; }

	public List<Tile>? WinningSequence { get; private set; }

	public string PositionInGENFormat => _gameBoard.PositionInGENFormat;

	public TileColor? NextTileColor => _gameBoard.NextTileColor;

	public PlayerAddingResult AddOpponent(Profile newOpponent)
	{
		if (Opponents.Any(opponent => opponent.Id == newOpponent.Id))
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlayerAddingValidationError.PlayerAlreadyAddedToGame,
				ErrorDetails = "Player already added to game"
			};
		}

		if (Opponents.Count >= 2)
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlayerAddingValidationError.BothPlacesTakenAlready,
				ErrorDetails = "Both places taken already"
			};
		}

		if (Opponents.Count == 0)
		{
			Opponents.Add(newOpponent);
			return new()
			{
				IsValid = true
			};
		}

		Opponents.Add(newOpponent);

		var (firstOpponent, secondOpponent) = _randomProvider.GetInt(0, 2) == 0 ? (Opponents[0], Opponents[1]) : (Opponents[1], Opponents[0]);
		var firstPlayer = new Player(firstOpponent.Id, firstOpponent.UserName, TileColor.Black);
		var secondPlayer = new Player(secondOpponent.Id, secondOpponent.UserName, TileColor.White);

		NextMoveShouldMakePlayerId = firstPlayer.Id;
		Status = GameStatus.BothPlayersJoined;
		Players.Black = firstPlayer;
		Players.White = secondPlayer;

		return new()
		{
			IsValid = true,
		};
	}

	public virtual GameTilePlacementResult PlaceTile(Tile tile, string playerId)
	{
		if (Status == GameStatus.Completed)
		{
			var gameResultString = Result;

			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.GameIsOver,
				ErrorDetails = $"Game is over. {Result.GetString()}"
			};
		}

		if (Status == GameStatus.WaitingForPlayersToJoin)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.NotBothPlayerAreJoinedYet,
				ErrorDetails = "Wait for other player to join"
			};
		}

		var (isInvolved, currentPlayer) = IsInvolved(playerId);
		if (!isInvolved)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.PlayerIsNotInvolvedInAGame,
				ErrorDetails = "You are spectator in this game"
			};
		}

		if (currentPlayer!.Id != NextMoveShouldMakePlayerId)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.OtherPlayerTurnNow,
				ErrorDetails = "Now is yours opponents turn"
			};
		}

		var placeNewTileResult = _gameBoard.PlaceNewTile(tile);

		if (placeNewTileResult.IsValid)
		{
			if (_movesHistory.Count == 0)
			{
				Status = GameStatus.InProgress;
			}
			_movesHistory.Add(_movesHistory.Count + 1, tile);

			NextMoveShouldMakePlayerId = currentPlayer!.Id != Players.Black!.Id ? Players.Black.Id : Players.White!.Id;
		}

		if (placeNewTileResult.IsTieSituationAfterMove)
		{
			Result = GameResult.Tie;
			Status = GameStatus.Completed;
			CompletionReason = CompletionReason.TieOnTheBoard;
		}

		if (placeNewTileResult.WinningSequence != null)
		{
			Result = currentPlayer!.Color == TileColor.Black ? GameResult.BlackWon : GameResult.WhiteWon;
			Status = GameStatus.Completed;
			CompletionReason = CompletionReason.MadeFiveInARow;

			Winner = currentPlayer;
			WinningSequence = placeNewTileResult.WinningSequence;
			NextMoveShouldMakePlayerId = null;
		}

		return new()
		{
			IsValid = placeNewTileResult.IsValid,
			ValidationError = placeNewTileResult.ValidationError,
		};
	}

	public ResignResult Resign(string playerId)
	{
		if (Status == GameStatus.Completed)
		{
			return new()
			{
				IsValid = false,
				ValidationError = ResignValidationError.GameIsOver,
			};
		}

		var (isInvolved, currentPlayer) = IsInvolved(playerId);
		if (!isInvolved)
		{
			return new()
			{
				IsValid = false,
				ValidationError = ResignValidationError.PlayerIsNotInvolvedInAGame,
			};
		}

		Winner = currentPlayer!.Id == Players!.Black!.Id ? Players.White : Players.Black;
		NextMoveShouldMakePlayerId = null;
		Result = currentPlayer!.Color == TileColor.Black ? GameResult.WhiteWon : GameResult.BlackWon;
		Status = GameStatus.Completed;
		CompletionReason = CompletionReason.Resign;

		return new()
		{
			IsValid = true
		};
	}

	public (bool isInvolved, Player? player) IsInvolved(string playerId)
	{
		return playerId switch
		{
			_ when Players?.Black?.Id == playerId => (true, Players.Black),
			_ when Players?.White?.Id == playerId => (true, Players.White),
			_ => (false, null)
		};
	}
}
