namespace GomokuServer.Application;

public class GameSessionHandler : IGameSessionHandler
{
	private const int BOARD_MIN_SIZE = 13;
	private readonly IGameRepository _gameRepository;
	private readonly IPlayersRepository _playersRepository;

	public GameSessionHandler(IGameRepository gameRepository, IPlayersRepository playersRepository)
	{
		_gameRepository = gameRepository;
		_playersRepository = playersRepository;
	}

	public Task<Result<Game>> GetAsync(string gameId)
	{
		return _gameRepository.GetAsync(gameId);
	}

	public async Task<Result<Game>> CreateAsync(int boardSize)
	{
		if (boardSize < BOARD_MIN_SIZE)
		{
			return Result.Invalid(new ValidationError($"Board size cannot be less than {BOARD_MIN_SIZE}"));
		}

		var game = new Game
		{
			GameBoard = new GameBoard(boardSize),
		};

		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status != ResultStatus.Ok)
		{
			return Result.Error();
		}

		return Result.Success(game);
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

	public async Task<Result<TilePlacementResult>> PlaceTileAsync(string gameId, Tile tile, string playerId)
	{
		var getGameResult = await _gameRepository.GetAsync(gameId);
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}

		var game = getGameResult.Value;
		var tilePlacementResult = game.PlaceTile(tile, playerId);

		if (!tilePlacementResult.IsValid)
		{
			return Result.Invalid(new ValidationError(tilePlacementResult.ValidationError.ToString()));
		}
			
		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status == ResultStatus.Error)
		{
			return Result.Error();
		}

		return Result.Success(tilePlacementResult);
	}
}
