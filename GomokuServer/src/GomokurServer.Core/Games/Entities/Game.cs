using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Extensions;
using GomokuServer.Core.Games.Results;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Entities;

public class Game
{
	private readonly Dictionary<int, Tile> _movesHistory = new();
	private readonly GameBoard _gameBoard;
	protected readonly IDateTimeProvider _dateTimeProvider;

	public Game(GameSettings gameSettings, Players players, IDateTimeProvider dateTimeProvider)
	{
		_gameBoard = new GameBoard(gameSettings.BoardSize);
		_dateTimeProvider = dateTimeProvider;

		GameSettings = gameSettings;
		Players = players;
		CurrentPlayer = Players.Black;
		CreatedAt = _dateTimeProvider.UtcNow;
		Status = GameStatus.NotStartedYet;
		Result = GameResult.NotCompletedYet;
	}

	public GameSettings GameSettings { get; init; }

	public required Guid GameId { get; init; }

	public DateTime CreatedAt { get; init; }

	public IReadOnlyDictionary<int, Tile> MovesHistory => _movesHistory.AsReadOnly();

	public Players Players { get; init; }

	public GameStatus Status { get; protected set; }

	public GameResult Result { get; protected set; }

	public CompletionReason CompletionReason { get; protected set; }

	public Player CurrentPlayer { get; protected set; }

	public Player? Winner { get; protected set; }

	public List<Tile>? WinningSequence { get; private set; }

	public string PositionInGENFormat => _gameBoard.PositionInGENFormat;

	public TileColor NextTileColor => _gameBoard.NextTileColor;

	protected virtual GameTilePlacementResult ValidateCanPlaceTile(string playerId)
	{
		if (Status == GameStatus.Completed)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.GameIsOver,
				ErrorDetails = $"Game is over. {Result.GetString()}"
			};
		}


		if (!IsInvolved(playerId))
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.PlayerIsNotInvolvedInAGame,
				ErrorDetails = "You are spectator in this game"
			};
		}

		if (playerId != CurrentPlayer?.Id)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.OtherPlayerTurnNow,
				ErrorDetails = "Now is yours opponents turn"
			};
		}

		return new()
		{
			IsValid = true,
		};
	}

	public virtual GameTilePlacementResult PlaceTile(Tile tile, string playerId)
	{
		var validationResult = ValidateCanPlaceTile(playerId);

		if (!validationResult.IsValid)
		{
			return validationResult;
		}

		var placeNewTileResult = _gameBoard.PlaceNewTile(tile);

		if (!placeNewTileResult.IsValid)
		{
			return new()
			{
				IsValid = placeNewTileResult.IsValid,
				ValidationError = placeNewTileResult.ValidationError,
			};
		}

		if (_movesHistory.Count == 0)
		{
			Status = GameStatus.InProgress;
		}
		_movesHistory.Add(_movesHistory.Count + 1, tile);

		if (placeNewTileResult.IsTieSituationAfterMove)
		{
			Result = GameResult.Tie;
			Status = GameStatus.Completed;
			CompletionReason = CompletionReason.TieOnTheBoard;
		}

		if (placeNewTileResult.WinningSequence != null)
		{
			Result = CurrentPlayer.GetGameResultFromColor();
			Status = GameStatus.Completed;
			CompletionReason = CompletionReason.MadeFiveInARow;

			Winner = CurrentPlayer;
			WinningSequence = placeNewTileResult.WinningSequence;
		}

		if (Status == GameStatus.InProgress)
		{
			CurrentPlayer = CurrentPlayer != Players.Black ? Players.Black : Players.White;
		}

		return new()
		{
			IsValid = true,
		};
	}

	public virtual ResignResult Resign(string playerId)
	{
		if (Status == GameStatus.Completed)
		{
			return new()
			{
				IsValid = false,
				ValidationError = ResignValidationError.GameIsOver,
				ErrorDetails = $"Game is over. {Result.GetString()}"
			};
		}

		if (!IsInvolved(playerId))
		{
			return new()
			{
				IsValid = false,
				ValidationError = ResignValidationError.PlayerIsNotInvolvedInAGame,
				ErrorDetails = "You are spectator in this game"
			};
		}

		var winner = Players.GetOpponent(playerId);
		Winner = winner;
		Result = winner.GetGameResultFromColor();
		Status = GameStatus.Completed;
		CompletionReason = CompletionReason.Resign;

		return new()
		{
			IsValid = true
		};
	}

	protected virtual RematchResult ValidateCanRematch(string playerId)
	{
		if (Status != GameStatus.Completed)
		{
			return new()
			{
				IsValid = false,
				ValidationError = RematchValidationError.GameIsNotOverYet,
				ErrorDetails = $"Can't request rematch. Game is not over yet",
			};
		}

		if (!IsInvolved(playerId))
		{
			return new()
			{
				IsValid = false,
				ValidationError = RematchValidationError.PlayerIsNotInvolvedInAGame,
				ErrorDetails = "Player is not involved in the game"
			};
		}

		return new()
		{
			IsValid = true
		};
	}

	public virtual RematchResult Rematch(string playerId)
	{
		var canRematchResult = ValidateCanRematch(playerId);

		if (!canRematchResult.IsValid)
		{
			return canRematchResult;
		}

		var newGame = new Game(GameSettings, new Players(Players.White, Players.Black), _dateTimeProvider)
		{
			GameId = Guid.NewGuid()
		};
		return RematchResult.Success(newGame);
	}

	public bool IsInvolved(string playerId)
	{
		if (Players.Black.Id == playerId)
		{
			return true;
		}

		if (Players.White.Id == playerId)
		{
			return true;
		}

		return false;
	}
}
