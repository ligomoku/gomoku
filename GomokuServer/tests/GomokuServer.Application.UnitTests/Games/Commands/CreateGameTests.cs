using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class CreateGameTests
{
	private IRegisteredAwaitingPlayersGamesRepository _registeredAwaitingPlayersGamesRepository;
	private IProfilesRepository _profilesRepository;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;
	private CreateRegisteredGameCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_registeredAwaitingPlayersGamesRepository = Substitute.For<IRegisteredAwaitingPlayersGamesRepository>();
		_profilesRepository = Substitute.For<IProfilesRepository>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();

		_handler = new CreateRegisteredGameCommandHandler(
			_registeredAwaitingPlayersGamesRepository,
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
		_registeredAwaitingPlayersGamesRepository.SaveAsync(Arg.Any<AwaitingPlayersGame>()).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Should().NotBeNull();
		result.Value.GameId.Should().NotBeNullOrEmpty();
		await _registeredAwaitingPlayersGamesRepository.Received(1).SaveAsync(Arg.Any<AwaitingPlayersGame>());
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
		await _registeredAwaitingPlayersGamesRepository.DidNotReceive().SaveAsync(Arg.Any<AwaitingPlayersGame>());
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
		await _registeredAwaitingPlayersGamesRepository.DidNotReceive().SaveAsync(Arg.Any<AwaitingPlayersGame>());
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
