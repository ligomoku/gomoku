using GomokuServer.Core.Results;
using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Entities;

public class Game
{
	private readonly List<GameMove> _playersMoves = new();
	private readonly GameBoard _gameBoard;

	public Game(GameBoard gameBoard)
	{
		_gameBoard = gameBoard;
	}

	public string GameId { get; } = Guid.NewGuid().ToString();

	public IReadOnlyList<GameMove> PlayersMoves => _playersMoves.AsReadOnly();

	public Player? PlayerOne { get; private set; }

	public Player? PlayerTwo { get; private set; }

	public bool HasBothPlayersJoined => PlayerOne != null && PlayerTwo != null;

	public bool IsGameStarted => HasBothPlayersJoined && _playersMoves.Count > 0;

	public string? WinnerId { get; private set; }

	public List<Tile>? WinningSequence { get; private set; }

	public PlayerAddingResult AddPlayer(Player player)
	{
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

		if (PlayerOne.Id == player.Id)
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlayerAddingValidationError.PlayerAlreadyAddedToGame,
			};
		}

		PlayerTwo = player;
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

		var tilePlacementResult = _gameBoard.PlaceTile(tile, playerId);

		if (tilePlacementResult.IsValid)
		{
			var move = new GameMove()
			{
				MoveNumber = _playersMoves.Count / 2 + 1,
				PlayerId = playerId,
				Tile = tile,
			};
			_playersMoves.Add(move);
		}

		if (tilePlacementResult.WinnerId != null)
		{
			WinnerId = tilePlacementResult.WinnerId;
			WinningSequence = tilePlacementResult.WinningSequence;
		}

		return tilePlacementResult;
	}
}
