using GomokuServer.Application.Games.Queries;
using GomokuServer.Application.UnitTests.TestData;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetGameHistoryTests
{
	private TestDataProvider _testDataProvider;
	private IRegisteredGamesRepository _registeredGamesRepository;
	private IAnonymousGamesRepository _anonymousGamesRepository;
	private GetGameHistoryQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_registeredGamesRepository = Substitute.For<IRegisteredGamesRepository>();
		_anonymousGamesRepository = Substitute.For<IAnonymousGamesRepository>();
		_handler = new GetGameHistoryQueryHandler(_registeredGamesRepository, _anonymousGamesRepository);
	}

	[Test]
	public async Task GetGameInformation_HasGameWithOnePlayer_ShouldReturnGameHistorySuccessfully()
	{
		// Arrange
		var game = _testDataProvider.GetGame_OnePlayerJoined();

		_registeredGamesRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetGameHistoryQuery { GameId = game.GameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.Players!.Black!.Should().BeNull();
		getGameResponse.Players!.White.Should().BeNull();
		getGameResponse.MovesHistory.Should().BeEmpty();
		getGameResponse.IsCompleted.Should().BeFalse();

		await _registeredGamesRepository.Received(1).GetAsync(game.GameId);
	}

	[Test]
	public async Task GetGameInformation_BothPlayersJoined_NoMoves_ShouldReturnGameHistorySuccessfully()
	{
		// Arrange
		var game = _testDataProvider.GetGame_TwoPlayersJoined_NoMoves();
		_registeredGamesRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetGameHistoryQuery { GameId = game.GameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.Players!.Black!.Should().Be(game.Players!.Black!.UserName);
		getGameResponse.Players!.White!.Should().Be(game.Players!.White!.UserName);
		getGameResponse.MovesHistory.Should().BeEmpty();
		getGameResponse.IsCompleted.Should().BeFalse();

		await _registeredGamesRepository.Received(1).GetAsync(game.GameId);
	}
}
