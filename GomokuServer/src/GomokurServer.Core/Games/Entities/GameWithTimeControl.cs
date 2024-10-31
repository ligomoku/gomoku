using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Results;
using GomokuServer.Core.Games.Validations;

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

	public override GameTilePlacementResult PlaceTile(Tile tile, string playerId)
	{
		//TODO: Refactor to call time check before calling base.PlaceTile()
		// To achive this, most likely needed base Game class, that has ValidateTileCanBePlaced method
		// or something
		// Or just duplicate logic, to validate if player by id is involved in the game

		var currentColor = NextTileColor;

		var tilePlacementResult = base.PlaceTile(tile, playerId);

		if (tilePlacementResult.IsValid)
		{
			if (Status == GameStatus.Completed)
			{
				_blackClock.Stop();
				_whiteClock.Stop();

				return tilePlacementResult;
			}

			var (currentPlayerClock, opponentsClock) = currentColor == TileColor.Black
				? (_blackClock, _whiteClock)
				: (_whiteClock, _blackClock);

			if (MovesHistory.Count == 0)
			{
				currentPlayerClock.Start();
				return tilePlacementResult;
			}

			if (currentPlayerClock.RemainingTimeInSeconds > 0)
			{
				currentPlayerClock.Stop();
				opponentsClock.Start();
				return tilePlacementResult;
			}

			var (winner, result) = playerId == Players.Black!.Id
				? (Players.White, GameResult.WhiteWon)
				: (Players.Black, GameResult.BlackWon);

			Winner = winner;
			Result = result;
			Status = GameStatus.Completed;
			CompletionReason = CompletionReason.TimeOut;

			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.TimeOut
			};
		}

		return tilePlacementResult;
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
