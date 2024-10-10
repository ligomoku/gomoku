using GomokuServer.Application.Games.Commands;
using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Application.Profiles.Interfaces;
using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class CreateGameTests
{
	private IGamesRepository _gameRepository;
	private IProfilesRepository _profilesRepository;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;
	private CreateGameCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_gameRepository = Substitute.For<IGamesRepository>();
		_profilesRepository = Substitute.For<IProfilesRepository>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();

		_handler = new CreateGameCommandHandler(
			_gameRepository,
			_profilesRepository,
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

		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(new Profile(command.PlayerId, "Alice")));
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

		_profilesRepository.GetAsync(command.PlayerId).Returns(Result<Profile>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
	}
}
