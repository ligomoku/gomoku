using Ardalis.Result;

using GomokuServer.Application.Games.Commands;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class AddPlayerToGameTests : FunctionalTestBase
{
	[Test]
	public async Task AddPlayerToGame_PassExistingPlayerId_ShouldSuccessfullyAddPlayerToGameInRegisteredGamesRepository()
	{
		// Arrange
		var game = _testDataProvider.GetGame_NoPlayersJoined();
		await RegisteredGamesRepository.SaveAsync(game);

		// Act
		var addPlayerResult = await SendAsync(new AddPlayerToGameCommand
		{
			GameId = game.GameId,
			PlayerId = "1"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await RegisteredGamesRepository.GetAsync(game.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.Ok);
		getUpdatedGameResult.Value.Opponents[0].Id.Should().Be("1");

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(game.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_WithOneOpponent_PassExistingPlayerId_ShouldSuccessfullyAddPlayerToGameInRegisteredGamesRepository()
	{
		// Arrange
		var game = _testDataProvider.GetGame_OnePlayerJoined();
		await RegisteredGamesRepository.SaveAsync(game);

		// Act
		var addPlayerResult = await SendAsync(new AddPlayerToGameCommand
		{
			GameId = game.GameId,
			PlayerId = "2"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await RegisteredGamesRepository.GetAsync(game.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.Ok);
		getUpdatedGameResult.Value.Opponents[1].Id.Should().Be("2");

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(game.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_PassNonExistingPlayerId_ShouldReturnNotFound()
	{
		// Act
		var addPlayerResult = await SendAsync(new AddPlayerToGameCommand
		{
			GameId = "gameId",
			PlayerId = "-999"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_PassPlayerIdAndNonExistingGameId_ShouldReturnNotFound()
	{
		// Act
		var addPlayerResult = await SendAsync(new AddPlayerToGameCommand
		{
			GameId = "nonExistingGameId",
			PlayerId = "1"
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_PassNullPlayerId_ShouldSuccessfullyAddPlayerToGameInAnonymousGamesRepository()
	{
		// Arrange
		var game = _testDataProvider.GetGame_NoPlayersJoined();
		await AnonymousGamesRepository.SaveAsync(game);

		// Act
		var addPlayerResult = await SendAsync(new AddPlayerToGameCommand
		{
			GameId = game.GameId,
			PlayerId = null
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await AnonymousGamesRepository.GetAsync(game.GameId);
		getUpdatedGameResult.Status.Should().Be(ResultStatus.Ok);
		getUpdatedGameResult.Value.Opponents[0].Id.Should().Be(addPlayerResult.Value.PlayerId);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(game.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task AddPlayerToGame_PassNullPlayerId_AndNonExistingGameId_ShouldReturnNotFound()
	{
		// Act
		var addPlayerResult = await SendAsync(new AddPlayerToGameCommand
		{
			GameId = "nonExistingPlayerId",
			PlayerId = null
		});

		// Assert
		addPlayerResult.Status.Should().Be(ResultStatus.NotFound);
	}
}
