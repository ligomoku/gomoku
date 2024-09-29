using GomokuServer.Core.Interfaces;
using GomokuServer.Core.Results;
using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Entities;

public class Game
{
	private readonly Dictionary<string, GameMove> _playersMoves = new();
	private readonly GameBoard _gameBoard;
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public Game(GameBoard gameBoard, IRandomProvider randomProvider, IDateTimeProvider dateTimeProvider)
	{
		_gameBoard = gameBoard;
		_randomProvider = randomProvider;
		_dateTimeProvider = dateTimeProvider;
		CreatedAt = _dateTimeProvider.UtcNow;
	}

	public string GameId { get; } = Guid.NewGuid().ToString();

	public DateTime CreatedAt { get; private set; }

	public IReadOnlyDictionary<string, GameMove> PlayersMoves => _playersMoves.AsReadOnly();

	public Player? PlayerOne { get; private set; }

	public Player? PlayerTwo { get; private set; }

	public bool HasBothPlayersJoined => PlayerOne != null && PlayerTwo != null;

	public bool IsGameStarted => HasBothPlayersJoined && _playersMoves.Count > 0;

	public string? NextMoveShouldMakePlayerId { get; private set; }

	public string? BlackPlayerId { get; private set; }

	public string? WhitePlayerId { get; private set; }

	public string? WinnerId { get; private set; }

	public List<Tile>? WinningSequence { get; private set; }

	public PlayerAddingResult AddPlayer(Player player)
	{
		if (PlayerOne?.Id == player.Id || PlayerTwo?.Id == player.Id)
		{
			return new()
			{
				IsValid = true,
			};
		}

		if (PlayerOne != null && PlayerTwo != null)
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlayerAddingValidationError.BothPlacesTakenAlready
			};
		}

		if (PlayerOne == null)
		{
			PlayerOne = player;
			return new()
			{
				IsValid = true
			};
		}

		PlayerTwo = player;

		var (firstPlayer, secondPlayer) = _randomProvider.GetInt(0, 2) == 0 ? (PlayerOne, PlayerTwo) : (PlayerTwo, PlayerOne);

		NextMoveShouldMakePlayerId = firstPlayer.Id;

		// In gomoku first move makes black player :D
		BlackPlayerId = firstPlayer.Id;
		WhitePlayerId = secondPlayer.Id;

		return new()
		{
			IsValid = true,
		};
	}

	public TilePlacementResult PlaceTile(Tile tile, string playerId)
	{
		if (WinnerId != null)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.GameIsOver,
				WinnerId = WinnerId,
			};
		}

		if (!HasBothPlayersJoined)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.NotBothPlayerAreJoinedYet,
			};
		}

		if (PlayerOne!.Id != playerId && PlayerTwo!.Id != playerId)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.PlayerIsNotInvolvedInAGame,
			};
		}

		if (playerId != NextMoveShouldMakePlayerId)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.SamePlayerMadeSecondMoveInARow
			};
		}

		var tilePlacementResult = _gameBoard.PlaceTile(tile, playerId);

		if (tilePlacementResult.IsValid)
		{
			var move = new GameMove()
			{
				MoveNumber = _playersMoves.Count / 2 + 1,
				PlayerId = playerId,
				Tile = tile,
			};
			_playersMoves.Add($"{tile.X}.{tile.Y}", move);

			NextMoveShouldMakePlayerId = playerId != PlayerOne.Id ? PlayerOne.Id : PlayerTwo!.Id;
		}

		if (tilePlacementResult.WinnerId != null)
		{
			WinnerId = tilePlacementResult.WinnerId;
			WinningSequence = tilePlacementResult.WinningSequence;
			NextMoveShouldMakePlayerId = null;
		}

		return tilePlacementResult;
	}
}
