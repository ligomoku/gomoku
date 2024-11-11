using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Results;
using GomokuServer.Core.Games.Validations;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Core.Games.Entities;

public class PlayersAwaitingGame
{
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;
	private readonly List<Profile> _opponents;

	public PlayersAwaitingGame(PlayersAwaitingGameSettings gameSettings, IRandomProvider randomProvider, IDateTimeProvider dateTimeProvider)
	{
		GameSettings = gameSettings;
		_randomProvider = randomProvider;
		_dateTimeProvider = dateTimeProvider;
		_opponents = new();
		GameId = Guid.NewGuid();
		CreatedAt = _dateTimeProvider.UtcNow;
	}

	public PlayersAwaitingGameSettings GameSettings { get; init; }

	public Guid GameId { get; init; }

	public DateTime CreatedAt { get; init; }

	public IReadOnlyList<Profile> Opponents => _opponents.AsReadOnly();

	public PlayerAddingResult AddPlayer(Profile profile)
	{
		if (_opponents.Any(opponent => opponent.Id == profile.Id))
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlayerAddingValidationError.PlayerAlreadyAddedToGame,
				ErrorDetails = "Player already added to game"
			};
		}

		if (_opponents.Count == 2)
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlayerAddingValidationError.BothPlacesTakenAlready,
				ErrorDetails = "Both places taken already"
			};
		}

		if (_opponents.Count == 0)
		{
			_opponents.Add(profile);
			return new()
			{
				IsValid = true
			};
		}

		_opponents.Add(profile);

		return new()
		{
			IsValid = true,
			CreatedGame = CreateGame(),
		};
	}

	private Game CreateGame()
	{
		var (firstOpponent, secondOpponent) = _randomProvider.GetInt(0, 2) == 0 ? (_opponents[0], _opponents[1]) : (_opponents[1], _opponents[0]);
		var players = new Players(firstOpponent.CreatePlayer(TileColor.Black), secondOpponent.CreatePlayer(TileColor.White));

		if (GameSettings.TimeControl != null)
		{
			var gameWithTimeControlSettings = new GameWithTimeControlSettings()
			{
				BoardSize = GameSettings.BoardSize,
				TimeControl = GameSettings.TimeControl,
			};
			return new GameWithTimeControl(gameWithTimeControlSettings, players, _dateTimeProvider)
			{
				GameId = GameId,
			};
		}

		var gameSettings = new GameSettings()
		{
			BoardSize = GameSettings.BoardSize,
		};
		return new Game(gameSettings, players, _dateTimeProvider)
		{
			GameId = GameId
		};
	}
}

public record PlayersAwaitingGameSettings
{
	public required int BoardSize { get; init; }
	public TimeControl? TimeControl { get; init; }
}
