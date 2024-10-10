using GomokuServer.Application.Games.Dto;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class PlaceTileTests
{
	private Game _game;
	private IRegisteredGamesRepository _registeredGamesRepository;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;
	private PlaceTileCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_game = Substitute.For<Game>(15, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());
		_registeredGamesRepository = Substitute.For<IRegisteredGamesRepository>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_handler = new PlaceTileCommandHandler(_registeredGamesRepository);
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
		var opponent = new Profile(command.PlayerId, "player1UserName");

		var game = new Game(15, _randomProvider, _dateTimeProvider);
		game.AddOpponent(opponent);
		game.AddOpponent(new Profile("player2", "player2UserName"));

		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_registeredGamesRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.IsWinningMove.Should().BeFalse();
		result.Value.PlacedTileColor.Should().Be("black");
		await _registeredGamesRepository.Received(1).SaveAsync(game);
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

		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result<Game>.NotFound());

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

		var game = new Game(15, _randomProvider, _dateTimeProvider);
		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result.Success(game));

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		await _registeredGamesRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
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

		var game = new Game(15, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		game.AddOpponent(new Profile("player1Id", "player1UserName"));
		game.AddOpponent(new Profile("player2Id", "player2UserName"));

		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_registeredGamesRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		for (int i = 0; i < 4; i++)
		{
			game.PlaceTile(new Tile(i, 7), game.Players!.Black!.Id);
			game.PlaceTile(new Tile(i, 8), game.Players!.White!.Id);
		}

		var winningMove = game.PlaceTile(new Tile(4, 7), game.Players!.Black!.Id);

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
	}
}
