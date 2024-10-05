using GomokuServer.Core.Interfaces;
using GomokuServer.Core.Results;
using GomokuServer.Core.Validation;

namespace GomokuServer.Core.Entities;

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
	}

	public int BoardSize { get; init; }

	public string GameId { get; } = Guid.NewGuid().ToString();

	public DateTime CreatedAt { get; init; }

	public IReadOnlyDictionary<int, Tile> MovesHistory => _movesHistory.AsReadOnly();

	public List<Opponent> Opponents { get; init; }

	public Players Players { get; init; }

	public bool HasBothPlayersJoined => Players.Black != null && Players.Black != null;

	public bool IsGameStarted => HasBothPlayersJoined && _movesHistory.Count > 0;

	public string? NextMoveShouldMakePlayerId { get; private set; }

	public Player? Winner { get; private set; }

	public List<Tile>? WinningSequence { get; private set; }

	public PlayerAddingResult AddOpponent(Opponent newOpponent)
	{
		if (Opponents.Any(opponent => opponent.Id == newOpponent.Id))
		{
			return new()
			{
				IsValid = true,
			};
		}

		if (Opponents.Count >= 2)
		{
			return new()
			{
				IsValid = false,
				ValidationError = PlayerAddingValidationError.BothPlacesTakenAlready
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
		Players.Black = firstPlayer;
		Players.White = secondPlayer;

		return new()
		{
			IsValid = true,
		};
	}

	public GameTilePlacementResult PlaceTile(Tile tile, string playerId)
	{
		if (Winner != null)
		{
			return new()
			{
				IsValid = false,
				ValidationError = TilePlacementValidationError.GameIsOver,
				Winner = Winner,
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

		if (Players.Black!.Id != playerId && Players.White!.Id != playerId)
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
				ValidationError = TilePlacementValidationError.OtherPlayerTurnNow
			};
		}

		var currentPlayer = playerId == Players.Black.Id ? Players.Black : Players.White;
		var boardTilePlacementResult = _gameBoard.PlaceTile(tile, currentPlayer!.Color);

		if (boardTilePlacementResult.IsValid)
		{
			_movesHistory.Add(_movesHistory.Count + 1, tile);

			NextMoveShouldMakePlayerId = playerId != Players.Black.Id ? Players.Black.Id : Players.White!.Id;
		}

		if (boardTilePlacementResult.WinningSequence != null)
		{
			Winner = currentPlayer;
			WinningSequence = boardTilePlacementResult.WinningSequence;
			NextMoveShouldMakePlayerId = null;
		}

		return new()
		{
			IsValid = boardTilePlacementResult.IsValid,
			PlacedTileColor = boardTilePlacementResult.PlacedTileColor,
			ValidationError = boardTilePlacementResult.ValidationError,
			WinningSequence = boardTilePlacementResult.WinningSequence,
			Winner = Winner,
		};
	}
}
