using GomokuServer.Application.Games.Commands;
using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class CreateGameTests
{
	private IGameRepository _gameRepository;
	private IPlayersRepository _playersRepository;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;
	private CreateGameCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_gameRepository = Substitute.For<IGameRepository>();
		_playersRepository = Substitute.For<IPlayersRepository>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();

		_handler = new CreateGameCommandHandler(
			_gameRepository,
			_playersRepository,
			_randomProvider,
			_dateTimeProvider);
	}

	[Test]
	public async Task CreateGame_WhenCommandIsValid_ShouldCreateGameSuccessfully()
	{
		// Arrange
		var command = new CreateGameCommand
		{
			BoardSize = 15,  // Valid board size
			PlayerId = "Player1"
		};

		_playersRepository.GetAsync(command.PlayerId).Returns(Result.Success(new Player(command.PlayerId, "Alice")));
		_gameRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Should().NotBeNull();
		result.Value.GameId.Should().NotBeNullOrEmpty();
		await _gameRepository.Received(1).SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task CreateGame_BoardSizeTooSmall_ShouldReturnValidationError()
	{
		// Arrange
		var command = new CreateGameCommand
		{
			BoardSize = 12,
			PlayerId = "Player1"
		};

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		result.ValidationErrors.Count().Should().Be(1);
		await _gameRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task CreateGame_BoardSizeTooLarge_ShouldReturnValidationError()
	{
		// Arrange
		var command = new CreateGameCommand
		{
			BoardSize = 20,
			PlayerId = "Player1"
		};

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		result.ValidationErrors.Count().Should().Be(1);
		await _gameRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task CreateGame_PlayerNotFound_ShouldReturnError()
	{
		// Arrange
		var command = new CreateGameCommand
		{
			BoardSize = 15,
			PlayerId = "NonExistentPlayerId"
		};

		_playersRepository.GetAsync(command.PlayerId).Returns(Result<Player>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
	}
}
