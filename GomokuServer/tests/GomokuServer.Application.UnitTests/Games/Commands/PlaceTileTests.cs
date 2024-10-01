using GomokuServer.Application.Dto;
using GomokuServer.Application.Games.Commands;
using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class PlaceTileTests
{
	private Game _game;
	private IGameRepository _gameRepository;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;
	private PlaceTileCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_game = Substitute.For<Game>(new GameBoard(15), Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());
		_gameRepository = Substitute.For<IGameRepository>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_handler = new PlaceTileCommandHandler(_gameRepository);
	}

	[Test]
	public async Task PlaceTile_WithValidMove_ShouldReturnSuccess()
	{
		// Arrange
		var command = new PlaceTileCommand
		{
			GameId = "NonExistentGameId",
			PlayerId = "Player1",
			Tile = new TileDto(0, 0)
		};
		var player = new Player(command.PlayerId, "player1UserName")
		{
			Color = TileColor.Black
		};

		var game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
		game.AddPlayer(player);
		game.AddPlayer(new Player("player2", "player2UserName"));

		_gameRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_gameRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.IsWinningMove.Should().BeFalse();
		result.Value.PlacedTileColor.Should().Be("Black");
		await _gameRepository.Received(1).SaveAsync(game);
	}

	[Test]
	public async Task PlaceTile_GameNotFound_ShouldReturnNotFound()
	{
		// Arrange
		var command = new PlaceTileCommand
		{
			GameId = "NonExistentGameId",
			PlayerId = "Player1",
			Tile = new TileDto(0, 0)
		};

		_gameRepository.GetAsync(command.GameId).Returns(Result<Game>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task PlaceTile_WhenGameNotStarted_ShouldReturnInvalid()
	{
		// Arrange
		var command = new PlaceTileCommand
		{
			GameId = "game1",
			PlayerId = "player1",
			Tile = new TileDto(0, 0)
		};

		var game = new Game(new GameBoard(15), _randomProvider, _dateTimeProvider);
		_gameRepository.GetAsync(command.GameId).Returns(Result.Success(game));

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		await _gameRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task PlaceTile_WhenGameIsOver_ShouldReturnInvalid()
	{
		// Arrange
		var command = new PlaceTileCommand
		{
			GameId = "game1",
			PlayerId = "player1Id",
			Tile = new TileDto(0, 0)
		};

		var game = new Game(new GameBoard(15), Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		game.AddPlayer(new Player("player1Id", "player1UserName"));
		game.AddPlayer(new Player("player2Id", "player2UserName"));

		_gameRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_gameRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		for (int i = 0; i < 4; i++)
		{
			game.PlaceTile(new Tile(i, 7), game.PlayerOne!.Id);
			game.PlaceTile(new Tile(i, 8), game.PlayerTwo!.Id);
		}

		var winningMove = game.PlaceTile(new Tile(4, 7), game.PlayerOne!.Id);

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
	}
}
