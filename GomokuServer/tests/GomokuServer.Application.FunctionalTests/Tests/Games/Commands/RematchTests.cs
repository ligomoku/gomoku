using Ardalis.Result;

using GomokuServer.Application.Games.Commands;
using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class RematchTests : FunctionalTestBase
{
	[Test]
	public async Task Rematch_PassExistingPlayerIdAndRegisteredGameId_ShouldSuccessfullyResignInRegisteredGame()
	{
		// Arrange
		var game = _testDataProvider.GetGame_HasWinner();
		await RegisteredGamesRepository.SaveAsync(game);

		// Act
		var rematchResult = await SendAsync(new RegisteredRematchCommand
		{
			GameId = game.GameId,
			PlayerId = game.Players.Black!.Id
		});

		// Assert
		rematchResult.Status.Should().Be(ResultStatus.Ok);

		var getNewGameResult = await RegisteredGamesRepository.GetAsync(rematchResult.Value.NewGameId);
		getNewGameResult.Status.Should().Be(ResultStatus.Ok);

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(rematchResult.Value.NewGameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task Rematch_PassExistingPlayerIdAndAnonymousGameId_ShouldSuccessfullyResignInRegisteredGame()
	{
		// Arrange
		var game = _testDataProvider.GetGame_HasWinner();
		await AnonymousGamesRepository.SaveAsync(game);

		// Act
		var rematchResult = await SendAsync(new AnonymousRematchCommand
		{
			GameId = game.GameId,
			PlayerId = game.Players.Black!.Id
		});

		// Assert
		rematchResult.Status.Should().Be(ResultStatus.Ok);

		var getNewGameResult = await AnonymousGamesRepository.GetAsync(rematchResult.Value.NewGameId);
		getNewGameResult.Status.Should().Be(ResultStatus.Ok);

		var getAnonymousGameResult = await RegisteredGamesRepository.GetAsync(rematchResult.Value.NewGameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task Rematch_InGameWithTimeControl_ShouldRecreateInstanceOfSameType()
	{
		// Arrange
		var game = _testDataProvider.GetGameWithTimeControl_HasWinner();
		await RegisteredGamesRepository.SaveAsync(game);

		// Act
		var rematchResult = await SendAsync(new RegisteredRematchCommand
		{
			GameId = game.GameId,
			PlayerId = game.Players.Black!.Id
		});

		// Assert
		rematchResult.Status.Should().Be(ResultStatus.Ok);

		var getGameResult = await RegisteredGamesRepository.GetAsync(rematchResult.Value.NewGameId);
		getGameResult.Status.Should().Be(ResultStatus.Ok);
		getGameResult.Value.Should().BeOfType<GameWithTimeControl>();
	}
}
