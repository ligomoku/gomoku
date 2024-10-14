
using GomokuServer.Application.FunctionalTests.TestData;
using GomokuServer.Application.Games.Commands;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class CreateGameTests
{
	private TestDataProvider _testDataProvider;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
	}

	[Test]
	public async Task CreateGame_PassExistingPlayerId_ShouldSuccessfullyCreateGame()
	{
		await AddRegisteredGameAsync(_testDataProvider.GetGame_NoPlayersJoined());

		var createGameResult = await SendAsync(new CreateGameCommand
		{
			BoardSize = 19,
			PlayerId = "1"
		});

		createGameResult.IsSuccess.Should().BeTrue();
	}
}
