using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Profiles.Entities;
using GomokuServer.Tests.Common;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class AddPlayerToGameTests
{
	private AwaitingPlayersGameSettings _gameSettings;
	private Players _players;
	private IRegisteredGamesRepository _registeredGamesRepository;
	private IRegisteredAwaitingPlayersGamesRepository _registeredAwaitingPlayersGamesRepository;
	private IAnonymousGamesRepository _anonymousGamesRepository;
	private IProfilesRepository _profilesRepository;
	private AddRegisteredPlayerToGameCommandHandler _handler;
	private TestDataProvider _testDataProvider;

	[SetUp]
	public void Setup()
	{
		_gameSettings = new AwaitingPlayersGameSettings { BoardSize = 15 };
		var blackPlayer = new Player("Player1Id", "Player1UserName", TileColor.Black);
		var whitePlayer = new Player("Player2Id", "Player2UserName", TileColor.White);
		_players = new Players(blackPlayer, whitePlayer);
		_registeredGamesRepository = Substitute.For<IRegisteredGamesRepository>();
		_registeredAwaitingPlayersGamesRepository = Substitute.For<IRegisteredAwaitingPlayersGamesRepository>();
		_anonymousGamesRepository = Substitute.For<IAnonymousGamesRepository>();
		_profilesRepository = Substitute.For<IProfilesRepository>();

		_handler = new AddRegisteredPlayerToGameCommandHandler(
			_registeredAwaitingPlayersGamesRepository,
			_registeredGamesRepository,
			_profilesRepository
		);

		_testDataProvider = new TestDataProvider();
	}

	[Test]
	public async Task AddPlayerToGame_AddingValidFirstPlayer_ShouldAddPlayerToGameSuccessfully()
	{
		// Arrange
		var command = new AddRegisteredPlayerToGameCommand
		{
			GameId = Guid.NewGuid().ToString(),
			PlayerId = "Player1"
		};

		var player = new Profile(command.PlayerId, "Alice");
		var game = new AwaitingPlayersGame(_gameSettings, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		_registeredAwaitingPlayersGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result.Success(game));
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(player));
		_registeredGamesRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		await _registeredGamesRepository.Received(0).SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task AddPlayerToGame_AddingValidSecondPlayer_ShouldAddPlayerAndCreateGameSuccessfully()
	{
		// Arrange
		var command = new AddRegisteredPlayerToGameCommand
		{
			GameId = Guid.NewGuid().ToString(),
			PlayerId = "Player2"
		};

		var playerOne = new Profile("Player1", "Alice");
		var playerTwo = new Profile(command.PlayerId, "Alice");

		var game = _testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined();

		_registeredAwaitingPlayersGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result.Success(game));
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(playerTwo));
		_registeredGamesRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		await _registeredGamesRepository.Received(1).SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task AddPlayerToGame_GameNotFound_ShouldReturnNotFound()
	{
		// Arrange
		var player = new Profile("Player1Id", "Player1UserName");
		var command = new AddRegisteredPlayerToGameCommand
		{
			GameId = Guid.NewGuid().ToString(),
			PlayerId = player.Id
		};

		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(player));
		_registeredAwaitingPlayersGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result<AwaitingPlayersGame>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_PlayerNotFound_ShouldReturnNotFound()
	{
		// Arrange
		var command = new AddRegisteredPlayerToGameCommand
		{
			GameId = Guid.NewGuid().ToString(),
			PlayerId = "NonExistentPlayerId"
		};

		var game = new AwaitingPlayersGame(_gameSettings, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		_registeredAwaitingPlayersGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result.Success(game));
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result<Profile>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_SaveGameFails_ShouldReturnError()
	{
		// Arrange
		var command = new AddRegisteredPlayerToGameCommand
		{
			GameId = Guid.NewGuid().ToString(),
			PlayerId = "Player1"
		};

		var game = _testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined();
		_registeredAwaitingPlayersGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result.Success(game));

		var player = new Profile(command.PlayerId, "Alice");
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(player));
		_registeredGamesRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Error());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
	}
}
