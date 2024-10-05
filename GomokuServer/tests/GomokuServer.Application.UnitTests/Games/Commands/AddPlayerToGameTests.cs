using GomokuServer.Application.Games.Commands;
using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class AddPlayerToGameTests
{
	private int _validBoardSize;
	private IGameRepository _gameRepository;
	private IOpponentsRepository _opponentsRepository;
	private AddPlayerToGameCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_validBoardSize = 15;
		_gameRepository = Substitute.For<IGameRepository>();
		_opponentsRepository = Substitute.For<IOpponentsRepository>();

		_handler = new AddPlayerToGameCommandHandler(
			_gameRepository,
			_opponentsRepository
		);
	}

	[Test]
	public async Task AddPlayerToGame_AddingValidFirstPlayer_ShouldAddPlayerToGameSuccessfully()
	{
		// Arrange
		var command = new AddPlayerToGameCommand
		{
			GameId = "Game1",
			PlayerId = "Player1"
		};

		var player = new Opponent(command.PlayerId, "Alice");
		var game = new Game(_validBoardSize, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		_gameRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_opponentsRepository.GetAsync(command.PlayerId).Returns(Result.Success(player));

		_gameRepository.SaveAsync(game).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		await _gameRepository.Received(1).SaveAsync(Arg.Is<Game>(g => g.Opponents[0]!.Id == command.PlayerId));
	}

	[Test]
	public async Task AddPlayerToGame_AddingValidSecondPlayer_ShouldAddPlayerToGameSuccessfully()
	{
		// Arrange
		var command = new AddPlayerToGameCommand
		{
			GameId = "Game1",
			PlayerId = "Player2"
		};

		var playerOne = new Opponent("Player1", "Alice");
		var playerTwo = new Opponent(command.PlayerId, "Alice");

		var game = new Game(_validBoardSize, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());
		game.AddOpponent(playerOne);

		_gameRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_opponentsRepository.GetAsync(command.PlayerId).Returns(Result.Success(playerTwo));

		_gameRepository.SaveAsync(game).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		await _gameRepository.Received(1).SaveAsync(Arg.Is<Game>(g => g.Players.White!.Id == command.PlayerId));
	}

	[Test]
	public async Task AddPlayerToGame_GameNotFound_ShouldReturnNotFound()
	{
		// Arrange
		var command = new AddPlayerToGameCommand
		{
			GameId = "NonExistentGameId",
			PlayerId = "Player1"
		};

		_gameRepository.GetAsync(command.GameId).Returns(Result<Game>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_PlayerNotFound_ShouldReturnNotFound()
	{
		// Arrange
		var command = new AddPlayerToGameCommand
		{
			GameId = "Game1",
			PlayerId = "NonExistentPlayerId"
		};

		var game = new Game(_validBoardSize, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		_gameRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_opponentsRepository.GetAsync(command.PlayerId).Returns(Result<Opponent>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_SaveGameFails_ShouldReturnError()
	{
		// Arrange
		var command = new AddPlayerToGameCommand
		{
			GameId = "Game1",
			PlayerId = "Player1"
		};

		var player = new Opponent(command.PlayerId, "Alice");
		var game = new Game(_validBoardSize, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		_gameRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_opponentsRepository.GetAsync(command.PlayerId).Returns(Result.Success(player));

		_gameRepository.SaveAsync(game).Returns(Result.Error());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
	}
}
