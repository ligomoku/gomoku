using GomokuServer.Application.Games.Queries;
using GomokuServer.Application.UnitTests.TestData;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetGameHistoryTests
{
	private TestDataProvider _testDataProvider;
	private IGameRepository _gameRepository;
	private GetGameHistoryQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_gameRepository = Substitute.For<IGameRepository>();
		_handler = new GetGameHistoryQueryHandler(_gameRepository);
	}

	[Test]
	public async Task GetGameInformation_HasGameWithOnePlayer_ShouldReturnGameHistorySuccessfully()
	{
		// Arrange
		var game = _testDataProvider.GetGame_OnePlayerJoined();

		_gameRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetGameHistoryQuery { GameId = game.GameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.Players!.Black!.Should().BeNull();
		getGameResponse.Players!.White.Should().BeNull();
		getGameResponse.MovesHistory.Should().BeEmpty();

		await _gameRepository.Received(1).GetAsync(game.GameId);
	}

	[Test]
	public async Task GetGameInformation_BothPlayersJoined_NoMoves_ShouldReturnGameHistorySuccessfully()
	{
		// Arrange
		var game = _testDataProvider.GetGame_TwoPlayersJoined_NoMoves();
		_gameRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetGameHistoryQuery { GameId = game.GameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.Players!.Black!.PlayerId.Should().Be(game.Players!.Black!.Id);
		getGameResponse.Players!.White!.PlayerId.Should().Be(game.Players!.White!.Id);
		getGameResponse.MovesHistory.Should().BeEmpty();

		await _gameRepository.Received(1).GetAsync(game.GameId);
	}
}
