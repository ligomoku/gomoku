using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Results;
using GomokuServer.Core.Games.Validations;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Core.Games.Entities;

public class GameWithTimeControl : Game
{
	private readonly Clock _blackClock;
	private readonly Clock _whiteClock;

	public GameWithTimeControl(
		int boardSize,
		TimeControl timeControl,
		IRandomProvider randomProvider,
		IDateTimeProvider dateTimeProvider
	) : base(boardSize, randomProvider, dateTimeProvider)
	{
		TimeControl = timeControl;
		_blackClock = new Clock(timeControl, dateTimeProvider);
		_whiteClock = new Clock(timeControl, dateTimeProvider);
	}

	public TimeControl TimeControl { get; init; }

	public int BlackRemainingTimeInSeconds => _blackClock.RemainingTimeInSeconds;

	public int WhiteRemainingTimeInSeconds => _whiteClock.RemainingTimeInSeconds;

	public bool IsTimeControlInitiated => MovesHistory.Count >= 2;

	public override GameTilePlacementResult PlaceTile(Tile tile, string playerId)
	{
		var canPlaceTile = base.ValidateCanPlaceTile(playerId);

		if (!canPlaceTile.IsValid)
		{
			return canPlaceTile;
		}

		if (_blackClock.RemainingTimeInSeconds <= 0)
		{
			Winner = Players.White;
			Result = GameResult.WhiteWon;
			Status = GameStatus.Completed;
			CompletionReason = CompletionReason.TimeOut;

			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.TimeOut,
				ErrorDetails = $"Time out. {Winner!.UserName} won."
			};
		}

		if (_whiteClock.RemainingTimeInSeconds <= 0)
		{
			Winner = Players.Black;
			Result = GameResult.BlackWon;
			Status = GameStatus.Completed;
			CompletionReason = CompletionReason.TimeOut;

			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.TimeOut,
				ErrorDetails = $"Time out. {Winner!.UserName} won."
			};
		}

		var tilePlacementResult = base.PlaceTile(tile, playerId);

		if (tilePlacementResult.IsValid)
		{
			if (Status == GameStatus.Completed)
			{
				_blackClock.Stop();
				_whiteClock.Stop();
				return tilePlacementResult;
			}

			if (IsTimeControlInitiated)
			{
				// After move CurrentPlayer is switched
				var (currentPlayerClock, opponentsClock) = CurrentPlayer!.Color == TileColor.White
					? (_blackClock, _whiteClock)
					: (_whiteClock, _blackClock);

				currentPlayerClock.Stop();
				opponentsClock.Start();
			}
		}

		return tilePlacementResult;
	}

	public override ResignResult Resign(string playerId)
	{
		var resignResult = base.Resign(playerId);

		if (resignResult.IsValid)
		{
			_blackClock.Stop();
			_whiteClock.Stop();
		}

		return resignResult;
	}

	public override RematchResult Rematch(string playerId)
	{
		var canRematchResult = ValidateCanRematch(playerId);
		if (!canRematchResult.IsValid)
		{
			return canRematchResult;
		}

		var newGame = new GameWithTimeControl(BoardSize, TimeControl, _randomProvider, _dateTimeProvider)
		{
			Opponents = new List<Profile>(Opponents),
			Players = new Players { Black = Players.White, White = Players.Black },
			Status = GameStatus.BothPlayersJoined,
			CurrentPlayer = Players.White
		};

		return RematchResult.Success(newGame);
	}

	public int? GetRemainingTime(string playerId)
	{
		if (playerId == Players?.Black?.Id)
		{
			return _blackClock.RemainingTimeInSeconds;
		};

		if (playerId == Players?.White?.Id)
		{
			return _whiteClock.RemainingTimeInSeconds;
		};

		return null;
	}
}
