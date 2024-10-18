using Ardalis.Result;

using GomokuServer.Application.Games.Commands;
using GomokuServer.Application.Games.Dto;
using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class CreateGameTests : FunctionalTestBase
{
	[Test]
	public async Task CreateGame_PassExistingPlayerId_ShouldSuccessfullyCreateGameInRegisteredGamesRepository()
	{
		// Act
		var createGameResult = await SendAsync(new CreateGameCommand
		{
			BoardSize = 19,
			PlayerId = "1"
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.Ok);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(createGameResult.Value.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.Ok);

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(createGameResult.Value.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task CreateGame_PassNonExistingPlayerId_ShouldReturnError()
	{
		// Act
		var createGameResult = await SendAsync(new CreateGameCommand
		{
			BoardSize = 19,
			PlayerId = "-999"
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.Error);
	}

	[Test]
	public async Task CreateGame_PassNullPlayerId_ShouldSuccessfullyCreateGameInAnonymousGamesRepository()
	{
		// Act
		var createGameResult = await SendAsync(new CreateGameCommand
		{
			BoardSize = 19
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.Ok);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(createGameResult.Value.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(createGameResult.Value.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.Ok);
	}

	[Test]
	public async Task CreateGame_TimeControlNull_ShouldSuccessfullyCreateGameWithTimeControl()
	{
		// Act
		var createGameResult = await SendAsync(new CreateGameCommand
		{
			BoardSize = 19,
			PlayerId = "1",
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.Ok);

		var getGameResult = await RegisteredGamesRepository.GetAsync(createGameResult.Value.GameId);
		getGameResult.Status.Should().Be(ResultStatus.Ok);
		getGameResult.Value.Should().BeOfType<Game>();
	}

	[Test]
	public async Task CreateGame_PassTimeControl_ShouldSuccessfullyCreateGameWithTimeControl()
	{
		// Act
		var createGameResult = await SendAsync(new CreateGameCommand
		{
			BoardSize = 19,
			PlayerId = "1",
			TimeControl = new TimeControlDto
			{
				InitialTimeInSeconds = 180,
				IncrementPerMove = 2,
			}
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.Ok);

		var getGameResult = await RegisteredGamesRepository.GetAsync(createGameResult.Value.GameId);
		getGameResult.Status.Should().Be(ResultStatus.Ok);
		getGameResult.Value.Should().BeOfType<GameWithTimeControl>();
	}
}
