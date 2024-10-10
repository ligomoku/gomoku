using Microsoft.Extensions.Logging;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class AddPlayerToGameTests
{
	private int _validBoardSize;
	private IRegisteredGamesRepository _registeredGamesRepository;
	private IAnonymousGamesRepository _anonymousGamesRepository;
	private IProfilesRepository _profilesRepository;
	private AddPlayerToGameCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_validBoardSize = 15;
		_registeredGamesRepository = Substitute.For<IRegisteredGamesRepository>();
		_anonymousGamesRepository = Substitute.For<IAnonymousGamesRepository>();
		_profilesRepository = Substitute.For<IProfilesRepository>();

		_handler = new AddPlayerToGameCommandHandler(
			_registeredGamesRepository,
			_anonymousGamesRepository,
			_profilesRepository,
			Substitute.For<ILogger<AddPlayerToGameCommandHandler>>()
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

		var player = new Profile(command.PlayerId, "Alice");
		var game = new Game(_validBoardSize, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(player));

		_registeredGamesRepository.SaveAsync(game).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		await _registeredGamesRepository.Received(1).SaveAsync(Arg.Is<Game>(g => g.Opponents[0]!.Id == command.PlayerId));
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

		var playerOne = new Profile("Player1", "Alice");
		var playerTwo = new Profile(command.PlayerId, "Alice");

		var game = new Game(_validBoardSize, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());
		game.AddOpponent(playerOne);

		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(playerTwo));

		_registeredGamesRepository.SaveAsync(game).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		await _registeredGamesRepository.Received(1).SaveAsync(Arg.Is<Game>(g => g.Players.White!.Id == command.PlayerId));
	}

	[Test]
	public async Task AddPlayerToGame_GameNotFound_ShouldReturnNotFound()
	{
		// Arrange
		var player = new Profile("Player1Id", "Player1UserName");
		var command = new AddPlayerToGameCommand
		{
			GameId = "NonExistentGameId",
			PlayerId = player.Id
		};

		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(player));
		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result<Game>.NotFound());

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

		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result.Success(game));
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
		var command = new AddPlayerToGameCommand
		{
			GameId = "Game1",
			PlayerId = "Player1"
		};

		var player = new Profile(command.PlayerId, "Alice");
		var game = new Game(_validBoardSize, Substitute.For<IRandomProvider>(), Substitute.For<IDateTimeProvider>());

		_registeredGamesRepository.GetAsync(command.GameId).Returns(Result.Success(game));
		_profilesRepository.GetAsync(command.PlayerId).Returns(Result.Success(player));

		_registeredGamesRepository.SaveAsync(game).Returns(Result.Error());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
	}
}
