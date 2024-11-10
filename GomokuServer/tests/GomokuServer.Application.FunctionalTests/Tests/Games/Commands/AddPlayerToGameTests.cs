using Ardalis.Result;

using GomokuServer.Application.Games.Commands;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class AddPlayerToGameTests : FunctionalTestBase
{
	[Test]
	public async Task AddPlayerToRegisteredGame_WhenAwaitingGameHasNoPlayers_ShouldSuccessfullyAddPlayerAndCreateGameInRegisteredGamesRepository()
	{
		// Arrange
		var awaitingPlayersGame = _testDataProvider.GetAwaitingPlayersGame_NoPlayersJoined();
		await RegisteredAwaitingPlayersGamesRepository.SaveAsync(awaitingPlayersGame);

		// Act
		var addPlayerResult = await SendAsync(new AddRegisteredPlayerToGameCommand
		{
			GameId = awaitingPlayersGame.GameId.ToString(),
			PlayerId = "2"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await RegisteredAwaitingPlayersGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.Ok);
		getUpdatedGameResult.Value.Opponents.Count.Should().Be(1);

		var getAnonymousGameResult = await AnonymousAwaitingPlayersGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToRegisteredGame_WhenAwaitingGameHasOnePlayer_ShouldSuccessfullyAddPlayerAndCreateGameInRegisteredGamesRepository()
	{
		// Arrange
		var awaitingPlayersGame = _testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined();
		await RegisteredAwaitingPlayersGamesRepository.SaveAsync(awaitingPlayersGame);

		// Act
		var addPlayerResult = await SendAsync(new AddRegisteredPlayerToGameCommand
		{
			GameId = awaitingPlayersGame.GameId.ToString(),
			PlayerId = "2"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await RegisteredAwaitingPlayersGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.Ok);
		getUpdatedGameResult.Value.Opponents.Count.Should().Be(2);

		var getAnonymousGameResult = await AnonymousAwaitingPlayersGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.Ok);
		getRegisteredGameResult.Value.GameId.Should().Be(awaitingPlayersGame.GameId);
	}

	[Test]
	public async Task AddPlayerToRegisteredGame_PassNonExistingPlayerId_ShouldReturnNotFound()
	{
		// Arrange
		var awaitingPlayersGame = _testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined();
		await RegisteredAwaitingPlayersGamesRepository.SaveAsync(awaitingPlayersGame);

		// Act
		var addPlayerResult = await SendAsync(new AddRegisteredPlayerToGameCommand
		{
			GameId = awaitingPlayersGame.GameId.ToString(),
			PlayerId = "-999"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToRegisteredGame_PassPlayerIdAndNonExistingGameId_ShouldReturnNotFound()
	{
		// Act
		var addPlayerResult = await SendAsync(new AddRegisteredPlayerToGameCommand
		{
			GameId = Guid.NewGuid().ToString(),
			PlayerId = "1"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToAnonymousGame_WhenAwaitingGameHasOnePlayer_ShouldSuccessfullyAddPlayerAndCreateGameInAnonymousGamesRepository()
	{
		// Arrange
		var awaitingPlayersGame = _testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined();
		await AnonymousAwaitingPlayersGamesRepository.SaveAsync(awaitingPlayersGame);

		// Act
		var addPlayerResult = await SendAsync(new AddAnonymousPlayerToGameCommand
		{
			GameId = awaitingPlayersGame.GameId.ToString()
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await AnonymousAwaitingPlayersGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.Ok);
		getUpdatedGameResult.Value.Opponents.Count.Should().Be(2);

		var getRegisteredGameResult = await RegisteredAwaitingPlayersGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(awaitingPlayersGame.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.Ok);
		getAnonymousGameResult.Value.GameId.Should().Be(awaitingPlayersGame.GameId);
	}

	[Test]
	public async Task AddPlayerToAnonymousGame_PassNonExistingGameId_ShouldReturnNotFound()
	{
		// Act
		var addPlayerResult = await SendAsync(new AddAnonymousPlayerToGameCommand
		{
			GameId = Guid.NewGuid().ToString(),
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.NotFound);
	}
}
