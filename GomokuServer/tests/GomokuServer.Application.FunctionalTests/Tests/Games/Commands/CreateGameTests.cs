using Ardalis.Result;

using GomokuServer.Application.Games.Commands;
using GomokuServer.Application.Games.Dto;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class CreateGameTests : FunctionalTestBase
{
	[Test]
	public async Task CreateGame_PassExistingPlayerId_ShouldSuccessfullyCreateGameInRegisteredGamesRepository()
	{
		// Act
		var createGameResult = await SendAsync(new CreateRegisteredGameCommand
		{
			BoardSize = 19,
			PlayerId = "1"
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.Ok);

		var getRegisteredGameResult = await RegisteredPlayersAwaitingGameRepository.GetAsync(Guid.Parse(createGameResult.Value.GameId));
		getRegisteredGameResult.Status.Should().Be(ResultStatus.Ok);

		var getAnonymousGameResult = await AnonymousPlayersAwaitingGameRepository.GetAsync(Guid.Parse(createGameResult.Value.GameId));
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task CreateGame_PassNonExistingPlayerId_ShouldReturnError()
	{
		// Act
		var createGameResult = await SendAsync(new CreateRegisteredGameCommand
		{
			BoardSize = 19,
			PlayerId = "-999"
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task CreateAnonymousGame_ShouldSuccessfullyCreateGameInAnonymousGamesRepository()
	{
		// Act
		var createGameResult = await SendAsync(new CreateAnonymousGameCommand
		{
			BoardSize = 19
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.Ok);

		var getRegisteredGameResult = await RegisteredPlayersAwaitingGameRepository.GetAsync(Guid.Parse(createGameResult.Value.GameId));
		getRegisteredGameResult.Status.Should().Be(ResultStatus.NotFound);

		var getAnonymousGameResult = await AnonymousPlayersAwaitingGameRepository.GetAsync(Guid.Parse(createGameResult.Value.GameId));
		getAnonymousGameResult.Status.Should().Be(ResultStatus.Ok);
	}

	[Test]
	public async Task CreateGame_TimeControlNull_ShouldSuccessfullyCreateGame()
	{
		// Act
		var createGameResult = await SendAsync(new CreateRegisteredGameCommand
		{
			BoardSize = 19,
			PlayerId = "1",
		});

		// Assert
		createGameResult.Status.Should().Be(ResultStatus.Ok);

		var getGameResult = await RegisteredPlayersAwaitingGameRepository.GetAsync(Guid.Parse(createGameResult.Value.GameId));
		getGameResult.Status.Should().Be(ResultStatus.Ok);
		getGameResult.Value.GameSettings.TimeControl.Should().BeNull();
	}

	[Test]
	public async Task CreateGame_PassTimeControl_ShouldSuccessfullyCreateGameWithTimeControl()
	{
		// Act
		var createGameResult = await SendAsync(new CreateRegisteredGameCommand
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

		var getGameResult = await RegisteredPlayersAwaitingGameRepository.GetAsync(Guid.Parse(createGameResult.Value.GameId));
		getGameResult.Status.Should().Be(ResultStatus.Ok);
		getGameResult.Value.GameSettings.TimeControl.Should().NotBeNull();
	}
}
