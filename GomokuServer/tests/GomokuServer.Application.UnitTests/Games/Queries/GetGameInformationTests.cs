using GomokuServer.Application.Games.Queries;
using GomokuServer.Application.UnitTests.TestData;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetGameInformationTests
{
	private TestDataProvider _testDataProvider;
	private IGameRepository _gameRepository;
	private GetGameInformationQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_gameRepository = Substitute.For<IGameRepository>();
		_handler = new GetGameInformationQueryHandler(_gameRepository);
	}

	[Test]
	public async Task GetGameInformation_HasGameWithOnePlayer_ShouldReturnGameInfoSuccessfully()
	{
		// Arrange
		var game = _testDataProvider.GetGameWithOnePlayer();

		_gameRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetGameInformationQuery { GameId = game.GameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.GameId.Should().Be(game.GameId);
		getGameResponse.HasBothPlayersJoined.Should().BeFalse();
		getGameResponse.IsGameStarted.Should().BeFalse();
		getGameResponse.NextMoveShouldMakePlayerId.Should().BeNull();
		getGameResponse.PlayerOne!.PlayerId.Should().Be(game.PlayerOne!.Id);
		getGameResponse.PlayerTwo.Should().BeNull();

		await _gameRepository.Received(1).GetAsync(game.GameId);
	}
}
