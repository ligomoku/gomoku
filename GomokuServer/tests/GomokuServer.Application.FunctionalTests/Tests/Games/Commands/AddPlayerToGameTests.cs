using Ardalis.Result;

using GomokuServer.Application.Games.Commands;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class AddPlayerToGameTests : FunctionalTestBase
{
	[Test]
	public async Task AddPlayerToRegisteredGame_WhenAwaitingGameHasNoPlayers_ShouldSuccessfullyAddPlayerAndCreateGameInRegisteredGamesRepository()
	{
		// Arrange
		var playersAwaitingGame = _testDataProvider.GetAwaitingPlayersGame_NoPlayersJoined();
		await RegisteredPlayersAwaitingGameRepository.SaveAsync(playersAwaitingGame);

		// Act
		var addPlayerResult = await SendAsync(new AddRegisteredPlayerToGameCommand
		{
			GameId = playersAwaitingGame.GameId.ToString(),
			PlayerId = "2"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await RegisteredPlayersAwaitingGameRepository.GetAsync(playersAwaitingGame.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.Ok);
		getUpdatedGameResult.Value.Opponents.Count.Should().Be(1);

		var getAnonymousGameResult = await AnonymousPlayersAwaitingGameRepository.GetAsync(playersAwaitingGame.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(playersAwaitingGame.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToRegisteredGame_WhenAwaitingGameHasOnePlayer_ShouldSuccessfullyAddPlayerAndCreateGameInRegisteredGamesRepository()
	{
		// Arrange
		var playersAwaitingGame = _testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined();
		await RegisteredPlayersAwaitingGameRepository.SaveAsync(playersAwaitingGame);

		// Act
		var addPlayerResult = await SendAsync(new AddRegisteredPlayerToGameCommand
		{
			GameId = playersAwaitingGame.GameId.ToString(),
			PlayerId = "2"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await RegisteredPlayersAwaitingGameRepository.GetAsync(playersAwaitingGame.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getAnonymousGameResult = await AnonymousPlayersAwaitingGameRepository.GetAsync(playersAwaitingGame.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(playersAwaitingGame.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.Ok);
		getRegisteredGameResult.Value.GameId.Should().Be(playersAwaitingGame.GameId);
	}

	[Test]
	public async Task AddPlayerToRegisteredGame_PassNonExistingPlayerId_ShouldReturnNotFound()
	{
		// Arrange
		var playersAwaitingGame = _testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined();
		await RegisteredPlayersAwaitingGameRepository.SaveAsync(playersAwaitingGame);

		// Act
		var addPlayerResult = await SendAsync(new AddRegisteredPlayerToGameCommand
		{
			GameId = playersAwaitingGame.GameId.ToString(),
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
	public async Task AddPlayerToAnonymousGame_WhenAwaitingGameHasOnePlayer_ShouldSuccessfully_AddPlayer_DeleteGameFromAwaitingRepository_CreateGameInAnonymousGamesRepository()
	{
		// Arrange
		var playersAwaitingGame = _testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined();
		await AnonymousPlayersAwaitingGameRepository.SaveAsync(playersAwaitingGame);

		// Act
		var addPlayerResult = await SendAsync(new AddAnonymousPlayerToGameCommand
		{
			GameId = playersAwaitingGame.GameId.ToString(),
			PlayerId = Guid.NewGuid().ToString(),
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await AnonymousPlayersAwaitingGameRepository.GetAsync(playersAwaitingGame.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getRegisteredGameResult = await RegisteredPlayersAwaitingGameRepository.GetAsync(playersAwaitingGame.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(playersAwaitingGame.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.Ok);
		getAnonymousGameResult.Value.GameId.Should().Be(playersAwaitingGame.GameId);
	}

	[Test]
	public async Task AddPlayerToAnonymousGame_PassNonExistingGameId_ShouldReturnNotFound()
	{
		// Act
		var addPlayerResult = await SendAsync(new AddAnonymousPlayerToGameCommand
		{
			GameId = Guid.NewGuid().ToString(),
			PlayerId = Guid.NewGuid().ToString(),
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.NotFound);
	}
}
