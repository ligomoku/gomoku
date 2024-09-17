namespace GomokuServer.Application.UnitTests;

public class GameSessionHandlerTests
{
	private IGameRepository _gameRepository;
	private IPlayersRepository _playersRepository;
	private GameSessionHandler _gameSessionHandler;

	[SetUp]
	public void Setup()
	{
		_gameRepository = Substitute.For<IGameRepository>();
		_playersRepository = Substitute.For<IPlayersRepository>();
		_gameSessionHandler = new GameSessionHandler(_gameRepository, _playersRepository);
	}

	[Test]
	public async Task CreateAsync_WithValidBoardSize_ShouldReturnSuccess()
	{
		// Arrange
		int validBoardSize = 15;
		_gameRepository.SaveAsync(Arg.Any<Game>())
			.Returns(Task.FromResult(Result.Success()));

		// Act
		var result = await _gameSessionHandler.CreateAsync(validBoardSize);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		await _gameRepository.Received(1).SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task CreateAsync_WithInvalidBoardSize_ShouldReturnValidationError()
	{
		// Arrange
		int invalidBoardSize = 10;

		// Act
		var result = await _gameSessionHandler.CreateAsync(invalidBoardSize);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		result.ValidationErrors.Count().Should().Be(1);
		await _gameRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task AddPlayerToGameAsync_WithValidGameAndPlayer_ShouldReturnSuccess()
	{
		// Arrange
		var gameId = "game1";
		var playerId = "player1";
		var game = new Game { GameBoard = new GameBoard(15) };
		var player = new Player(playerId);

		_gameRepository.GetAsync(gameId).Returns(Result.Success(game));
		_playersRepository.GetAsync(playerId).Returns(Result.Success(player));
		_gameRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _gameSessionHandler.AddPlayerToGameAsync(gameId, playerId);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		game.PlayerOne.Should().Be(player);
		await _gameRepository.Received(1).SaveAsync(game);
	}

	[Test]
	public async Task AddPlayerToGameAsync_WithSecondPlayer_ShouldReturnSuccess()
	{
		// Arrange
		var gameId = "game1";
		var playerOneId = "player1";
		var playerTwoId = "player2";
		var game = new Game { GameBoard = new GameBoard(15) };
		game.AddPlayer(new Player(playerOneId));

		var playerTwo = new Player(playerTwoId);

		_gameRepository.GetAsync(gameId).Returns(Result.Success(game));
		_playersRepository.GetAsync(playerTwoId).Returns(Result.Success(playerTwo));
		_gameRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _gameSessionHandler.AddPlayerToGameAsync(gameId, playerTwoId);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		game.PlayerTwo.Should().Be(playerTwo);
		await _gameRepository.Received(1).SaveAsync(game);
	}

	[Test]
	public async Task AddPlayerToGameAsync_WhenTwoPlayersAlreadyAdded_ShouldReturnInvalid()
	{
		// Arrange
		var gameId = "game1";
		var playerOne = new Player("player1");
		var playerTwo = new Player("player2");
		var newPlayer = new Player("player3");

		var game = new Game { GameBoard = new GameBoard(15) };
		game.AddPlayer(playerOne);
		game.AddPlayer(playerTwo);

		_gameRepository.GetAsync(gameId).Returns(Result.Success(game));
		_playersRepository.GetAsync(newPlayer.Id).Returns(Result.Success(newPlayer));

		// Act
		var result = await _gameSessionHandler.AddPlayerToGameAsync(gameId, newPlayer.Id);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		await _gameRepository.DidNotReceive().SaveAsync(game);
	}

	[Test]
	public async Task PlaceTileAsync_WithValidMove_ShouldReturnSuccess()
	{
		// Arrange
		var gameId = "game1";
		var playerId = "player1";
		var tile = new Tile(0, 0);
		var player = new Player(playerId);

		var game = new Game { GameBoard = new GameBoard(15) };
		game.AddPlayer(player);
		game.AddPlayer(new Player("player2"));

		_gameRepository.GetAsync(gameId).Returns(Result.Success(game));
		_gameRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _gameSessionHandler.PlaceTileAsync(gameId, tile, playerId);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		game.PlayersMoves.Should().Contain(tile);
		await _gameRepository.Received(1).SaveAsync(game);
	}

	[Test]
	public async Task PlaceTileAsync_WhenGameNotStarted_ShouldReturnInvalid()
	{
		// Arrange
		var gameId = "game1";
		var playerId = "player1";
		var tile = new Tile(0, 0);
		var game = new Game { GameBoard = new GameBoard(15) };

		_gameRepository.GetAsync(gameId).Returns(Result.Success(game));

		// Act
		var result = await _gameSessionHandler.PlaceTileAsync(gameId, tile, playerId);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		await _gameRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task PlaceTileAsync_WhenGameIsOver_ShouldReturnInvalid()
	{
		// Arrange
		var gameId = "game1";
		var playerId = "player1";
		var tile = new Tile(0, 0);
		var game = new Game { GameBoard = new GameBoard(15), WinnerId = "player2" };

		_gameRepository.GetAsync(gameId).Returns(Result.Success(game));

		// Act
		var result = await _gameSessionHandler.PlaceTileAsync(gameId, tile, playerId);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		await _gameRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
	}
}