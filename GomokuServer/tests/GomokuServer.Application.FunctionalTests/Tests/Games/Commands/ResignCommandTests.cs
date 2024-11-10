using Ardalis.Result;

using GomokuServer.Application.Games.Commands;
using GomokuServer.Core.Games.Enums;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class ResignCommandTests : FunctionalTestBase
{
	[Test]
	public async Task Resign_PassExistingPlayerIdAndRegisteredGameId_ShouldSuccessfullyResignInRegisteredGame()
	{
		// Arrange
		var game = _testDataProvider.GetGame_NoMoves();
		await RegisteredGamesRepository.SaveAsync(game);

		// Act
		var resignResult = await SendAsync(new RegisteredResignCommand
		{
			GameId = game.GameId.ToString(),
			PlayerId = game.Players.Black!.Id
		});

		// Assert
		resignResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await RegisteredGamesRepository.GetAsync(game.GameId);
		getUpdatedGameResult.Value.CompletionReason.Should().Be(CompletionReason.Resign);
		getUpdatedGameResult.Value.Winner!.Id.Should().Be(game.Players.White!.Id);

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(game.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task Resign_PassExistingPlayerIdAndAnonymousGameId_ShouldSuccessfullyResignInAnonymousGame()
	{
		// Arrange
		var game = _testDataProvider.GetGame_NoMoves();
		await AnonymousGamesRepository.SaveAsync(game);

		// Act
		var resignResult = await SendAsync(new AnonymousResignCommand
		{
			GameId = game.GameId.ToString(),
			PlayerId = game.Players.Black!.Id
		});

		// Assert
		resignResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await AnonymousGamesRepository.GetAsync(game.GameId);
		getUpdatedGameResult.Value.CompletionReason.Should().Be(CompletionReason.Resign);
		getUpdatedGameResult.Value.Winner!.Id.Should().Be(game.Players.White!.Id);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(game.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task Resign_PassNonExistingGameId_ShouldReturnNotFound()
	{
		// Act
		var resignResult = await SendAsync(new RegisteredResignCommand
		{
			GameId = Guid.NewGuid().ToString(),
			PlayerId = "somePlayerId"
		});

		// Assert
		resignResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task Resign_InvalidResignAttempt_ShouldReturnInvalid()
	{
		// Arrange
		var game = _testDataProvider.GetGame_NoMoves();
		await RegisteredGamesRepository.SaveAsync(game);

		// Act
		var resignResult = await SendAsync(new RegisteredResignCommand
		{
			GameId = game.GameId.ToString(),
			PlayerId = "nonParticipatingPlayerId"
		});

		// Assert
		resignResult.Status.Should().Be(ResultStatus.Invalid);
	}
}
