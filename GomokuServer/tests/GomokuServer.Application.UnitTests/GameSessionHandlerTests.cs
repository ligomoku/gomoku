using System.Linq.Expressions;

using GomokuServer.Application.Dto;
using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.UnitTests;

public class GameSessionHandlerTests
{
	private IGameRepository _gameRepository;
	private IPlayersRepository _playersRepository;
	private GameSessionHandler _gameSessionHandler;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;

	[SetUp]
	public void Setup()
	{
		_gameRepository = Substitute.For<IGameRepository>();
		_playersRepository = Substitute.For<IPlayersRepository>();

		_randomProvider = Substitute.For<IRandomProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);

		_dateTimeProvider = Substitute.For<IDateTimeProvider>();

		_gameSessionHandler = new GameSessionHandler(_gameRepository, _playersRepository, _randomProvider, _dateTimeProvider);
	}

	[Test]
	public async Task GetAvailableGamesAsync_WhenNoGamesAvailable_ShouldReturnSuccessWithEmptyList()
	{
		// Arrange
		_gameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result.Success(Enumerable.Empty<Game>())));

		// Act
		var result = await _gameSessionHandler.GetAvailableGamesAsync();

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Should().NotBeNull();
		result.Value.Count().Should().Be(0);
		await _gameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}

	[Test]
	public async Task GetAvailableGamesAsync_WhenRepositoryFails_ShouldReturnFailure()
	{
		// Arrange
		_gameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result<IEnumerable<Game>>.Error("Error fetching games")));

		// Act
		var result = await _gameSessionHandler.GetAvailableGamesAsync();

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
		result.Errors.First().Should().Be("Error fetching games");
		await _gameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
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
	public async Task CreateAsync_WithBoardSizeLessThanAllowed_ShouldReturnValidationError()
	{
		// Arrange
		int lessThanAllowedBoardSize = 12;

		// Act
		var result = await _gameSessionHandler.CreateAsync(lessThanAllowedBoardSize);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		result.ValidationErrors.Count().Should().Be(1);
		await _gameRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task CreateAsync_WithBoardSizeMoreThanAllowed_ShouldReturnValidationError()
	{
		// Arrange
		int moreThanAllowedBoardSize = 20;

		// Act
		var result = await _gameSessionHandler.CreateAsync(moreThanAllowedBoardSize);

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
		var playerId = "playerId";
		var userName = "userName";
		var game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
		var player = new Player(playerId, userName);

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
		var playerOneId = "player1Id";
		var playerOneUserName = "player1Username";
		var playerTwoId = "player2Id";
		var playerTwoUserName = "player1Username";
		var game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
		game.AddPlayer(new Player(playerOneId, playerOneUserName));

		var playerTwo = new Player(playerTwoId, playerTwoUserName);

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
		var playerOne = new Player("player1Id", "player1UserName");
		var playerTwo = new Player("player2Id", "player2UserName");
		var newPlayer = new Player("player3Id", "player3UserName");

		var game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
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
		var playerId = "player1Id";
		var userName = "player1UserName";
		var tile = new TileDto(0, 0);
		var player = new Player(playerId, userName);

		var game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
		game.AddPlayer(player);
		game.AddPlayer(new Player("player2", "player2UserName"));

		_gameRepository.GetAsync(gameId).Returns(Result.Success(game));
		_gameRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _gameSessionHandler.PlaceTileAsync(gameId, tile, playerId);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.IsWinningMove.Should().BeFalse();
		await _gameRepository.Received(1).SaveAsync(game);
	}

	[Test]
	public async Task PlaceTileAsync_WhenGameNotStarted_ShouldReturnInvalid()
	{
		// Arrange
		var gameId = "game1";
		var playerId = "player1";
		var tile = new TileDto(0, 0);
		var game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);

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
		var playerOneId = "player1Id";
		var playerOneUserName = "player1UserName";
		var playerTwoId = "player2Id";
		var playerTwoUserName = "player1UserName";
		var tile = new TileDto(0, 0);
		var game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
		game.AddPlayer(new Player(playerOneId, playerOneUserName));
		game.AddPlayer(new Player(playerTwoId, playerTwoUserName));

		_gameRepository.GetAsync(gameId).Returns(Result.Success(game));
		_gameRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		for (int i = 0; i < 4; i++)
		{
			await _gameSessionHandler.PlaceTileAsync(gameId, new TileDto(i, 7), game.PlayerOne!.Id);
			await _gameSessionHandler.PlaceTileAsync(gameId, new TileDto(i, 8), game.PlayerTwo!.Id);
		}
		var winningMove = await _gameSessionHandler.PlaceTileAsync(gameId, new TileDto(4, 7), game.PlayerOne!.Id);

		// Act
		var result = await _gameSessionHandler.PlaceTileAsync(gameId, tile, playerOneId);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
	}
}
