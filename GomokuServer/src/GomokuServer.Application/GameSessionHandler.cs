using GomokuServer.Application.Responses;
using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application;

public class GameSessionHandler : IGameSessionHandler
{
	private const int BOARD_MIN_SIZE = 13;
	private const int BOARD_MAX_SIZE = 19;
	private readonly IGameRepository _gameRepository;
	private readonly IPlayersRepository _playersRepository;
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public GameSessionHandler(IGameRepository gameRepository, IPlayersRepository playersRepository, IRandomProvider randomProvider, IDateTimeProvider dateTimeProvider)
	{
		_gameRepository = gameRepository;
		_playersRepository = playersRepository;
		_randomProvider = randomProvider;
		_dateTimeProvider = dateTimeProvider;
	}

	public async Task<Result<GetGameResponse>> GetAsync(string gameId)
	{
		var getGameResult = await _gameRepository.GetAsync(gameId);

		return getGameResult.Map(game => new GetGameResponse
		{
			GameId = game.GameId,
			PlayerOne = game.PlayerOne != null ? new PlayerDto(game.PlayerOne.Id, game.PlayerOne.UserName) : null,
			PlayerTwo = game.PlayerTwo != null ? new PlayerDto(game.PlayerTwo.Id, game.PlayerTwo.UserName) : null,
			HasBothPlayersJoined = game.HasBothPlayersJoined,
			IsGameStarted = game.IsGameStarted,
			NextMoveShouldMakePlayerId = game.NextMoveShouldMakePlayerId,
			WinnerId = game.WinnerId,
			WinningSequence = game.WinningSequence?.Select(tile => new TileDto(tile.X, tile.Y)),
			PlayersMoves = game.PlayersMoves.ToDictionary(
				keyValuePair => keyValuePair.Key,
				keyValuePair => new GameMoveDto
				{
					MoveNumber = keyValuePair.Value.MoveNumber,
					PlayerId = keyValuePair.Value.PlayerId,
					Tile = new TileDto(keyValuePair.Value.Tile.X, keyValuePair.Value.Tile.Y)
				}
			)
		});
	}

	public async Task<Result<IEnumerable<GetAvailableGamesResponse>>> GetAvailableGamesAsync()
	{
		var getAvailableGamesResult = await _gameRepository.GetByExpressionAsync(game => !game.HasBothPlayersJoined, query => query.OrderByDescending(game => game.CreatedAt));

		var mappedResult =
			getAvailableGamesResult.Map(games => games.Select(game =>
			{
				PlayerDto opponent = game.PlayerOne != null
					? new PlayerDto(game.PlayerOne.Id, game.PlayerOne.UserName)
					: new PlayerDto(game.PlayerTwo!.Id, game.PlayerTwo!.UserName);

				return new GetAvailableGamesResponse(game.GameId, opponent);
			}
			));

		return mappedResult;
	}

	public async Task<Result<CreateGameResponse>> CreateAsync(int boardSize, string playerId)
	{
		if (boardSize < BOARD_MIN_SIZE || boardSize > BOARD_MAX_SIZE)
		{
			return Result.Invalid(new ValidationError($"Board size cannot be less than {BOARD_MIN_SIZE} and more than {BOARD_MAX_SIZE}"));
		}

		var getPlayerResult = await _playersRepository.GetAsync(playerId);
		if (!getPlayerResult.IsSuccess)
		{
			return Result.Error("Cannot get user by id. See logs for more details");
		}

		var game = new Game(new GameBoard(boardSize), _randomProvider, _dateTimeProvider);
		var addPlayerResult = game.AddPlayer(getPlayerResult.Value);

		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status != ResultStatus.Ok)
		{
			return Result.Error();
		}

		return Result.Success(new CreateGameResponse(game.GameId));
	}

	public async Task<Result> AddPlayerToGameAsync(string gameId, string playerId)
	{
		var getGameResult = await _gameRepository.GetAsync(gameId);
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}

		var game = getGameResult.Value;

		var getPlayerResult = await _playersRepository.GetAsync(playerId);

		if (getPlayerResult.Status != ResultStatus.Ok)
		{
			if (getPlayerResult.IsNotFound())
			{
				return Result.NotFound($"Player with id {playerId} not found");
			}

			return Result.Error();
		}

		var addingResult = game.AddPlayer(getPlayerResult.Value);

		if (!addingResult.IsValid)
		{
			return Result.Invalid(new ValidationError(addingResult.ValidationError.ToString()));
		}

		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status != ResultStatus.Ok)
		{
			return Result.Error();
		}

		return Result.Success();
	}

	public async Task<Result<PlaceTileResponse>> PlaceTileAsync(string gameId, TileDto tileDto, string playerId)
	{
		var getGameResult = await _gameRepository.GetAsync(gameId);
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}

		var game = getGameResult.Value;
		var tilePlacementResult = game.PlaceTile(new Tile(tileDto.X, tileDto.Y), playerId);

		if (!tilePlacementResult.IsValid)
		{
			return Result.Invalid(new ValidationError(tilePlacementResult.ValidationError.ToString()));
		}

		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status == ResultStatus.Error)
		{
			return Result.Error();
		}

		return Result.Success(new PlaceTileResponse(tilePlacementResult.WinningSequence?.Select(tile => new TileDto(tile.X, tile.Y)).ToList()));
	}
}
