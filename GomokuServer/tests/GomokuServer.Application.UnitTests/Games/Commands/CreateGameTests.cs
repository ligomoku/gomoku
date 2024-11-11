using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class CreateGameTests
{
	private IRegisteredPlayersAwaitingGameRepository _registeredPlayersAwaitingGameRepository;
	private IProfilesRepository _profilesRepository;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;
	private CreateRegisteredGameCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_registeredPlayersAwaitingGameRepository = Substitute.For<IRegisteredPlayersAwaitingGameRepository>();
		_profilesRepository = Substitute.For<IProfilesRepository>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();

		_handler = new CreateRegisteredGameCommandHandler(
			_registeredPlayersAwaitingGameRepository,
			_profilesRepository,
			_randomProvider,
			_dateTimeProvider);
	}

	[Test]
	public async Task CreateGame_WhenCommandIsValid_ShouldCreateGameSuccessfully()
	{
		// Arrange
		var command = new CreateRegisteredGameCommand
		{
			BoardSize = 15,  // Valid board size
			PlayerId = "Player1"
		};

		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(new Profile(command.PlayerId, "Alice")));
		_registeredPlayersAwaitingGameRepository.SaveAsync(Arg.Any<PlayersAwaitingGame>()).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Should().NotBeNull();
		result.Value.GameId.Should().NotBeNullOrEmpty();
		await _registeredPlayersAwaitingGameRepository.Received(1).SaveAsync(Arg.Any<PlayersAwaitingGame>());
	}

	[Test]
	public async Task CreateGame_BoardSizeTooSmall_ShouldReturnValidationError()
	{
		// Arrange
		var command = new CreateRegisteredGameCommand
		{
			BoardSize = 12,
			PlayerId = "Player1"
		};
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(new Profile(command.PlayerId, "Alice")));

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		result.ValidationErrors.Count().Should().Be(1);
		await _registeredPlayersAwaitingGameRepository.DidNotReceive().SaveAsync(Arg.Any<PlayersAwaitingGame>());
	}

	[Test]
	public async Task CreateGame_BoardSizeTooLarge_ShouldReturnValidationError()
	{
		// Arrange
		var command = new CreateRegisteredGameCommand
		{
			BoardSize = 20,
			PlayerId = "Player1"
		};
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(new Profile(command.PlayerId, "Alice")));

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		result.ValidationErrors.Count().Should().Be(1);
		await _registeredPlayersAwaitingGameRepository.DidNotReceive().SaveAsync(Arg.Any<PlayersAwaitingGame>());
	}

	[Test]
	public async Task CreateGame_PlayerNotFound_ShouldReturnError()
	{
		// Arrange
		var command = new CreateRegisteredGameCommand
		{
			BoardSize = 15,
			PlayerId = "NonExistentPlayerId"
		};

		_profilesRepository.GetAsync(command.PlayerId).Returns(Result<Profile>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
	}
}
