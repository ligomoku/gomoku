using GomokuServer.Application.Games.Queries;
using GomokuServer.Tests.Common;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetGameHistoryTests
{
	private TestDataProvider _testDataProvider;
	private IRegisteredGamesRepository _registeredGamesRepository;
	private IRegisteredPlayersAwaitingGameRepository _playersAwaitingGameRepository;
	private GetRegisteredGameHistoryQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_registeredGamesRepository = Substitute.For<IRegisteredGamesRepository>();
		_playersAwaitingGameRepository = Substitute.For<IRegisteredPlayersAwaitingGameRepository>();
		_handler = new GetRegisteredGameHistoryQueryHandler(_registeredGamesRepository, _playersAwaitingGameRepository);
	}

	[Test]
	public async Task GetGameInformation_BothPlayersJoined_NoMoves_ShouldReturnGameHistorySuccessfully()
	{
		// Arrange
		var game = _testDataProvider.GetGame_NoMoves();
		_registeredGamesRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetRegisteredGameHistoryQuery { GameId = game.GameId.ToString() };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.HasBothPlayersJoined.Should().BeTrue();
		getGameResponse.IsGameStarted.Should().BeFalse();
		getGameResponse.Players!.Black!.PlayerId.Should().Be(game.Players!.Black!.Id);
		getGameResponse.Players!.White!.PlayerId.Should().Be(game.Players!.White!.Id);
		getGameResponse.MovesHistory.Should().BeEmpty();
		getGameResponse.Winner.Should().BeNull();
		getGameResponse.WinningSequence.Should().BeNull();

		await _registeredGamesRepository.Received(1).GetAsync(game.GameId);
	}

	[Test]
	public async Task GetGameInformation_GameHasWinner_ShouldReturnGameInfoWithWinner()
	{
		// Arrange
		var game = _testDataProvider.GetGame_HasWinner();
		_registeredGamesRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetRegisteredGameHistoryQuery { GameId = game.GameId.ToString() };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.HasBothPlayersJoined.Should().BeTrue();
		getGameResponse.IsGameStarted.Should().BeTrue();
		getGameResponse.Winner?.Should().Be(game.Winner?.UserName);
		getGameResponse.WinningSequence.Should().NotBeNull();
		getGameResponse.WinningSequence.Should().HaveCount(game.WinningSequence!.Count);
		foreach (var tile in game.WinningSequence)
		{
			getGameResponse.WinningSequence.Should().Contain(t => t.X == tile.X && t.Y == tile.Y);
		}

		await _registeredGamesRepository.Received(1).GetAsync(game.GameId);
	}

	[Test]
	public async Task GetGameInformation_GameNotFoundInBothGamesAndPlayersAwaitingGameRepository_ShouldReturnNotFound()
	{
		// Arrange
		var invalidGameId = Guid.NewGuid();
		_registeredGamesRepository.GetAsync(invalidGameId).Returns(Task.FromResult(Result<Game>.NotFound()));
		_playersAwaitingGameRepository.GetAsync(invalidGameId).Returns(Task.FromResult(Result<PlayersAwaitingGame>.NotFound()));

		var query = new GetRegisteredGameHistoryQuery { GameId = invalidGameId.ToString() };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
		result.Value.Should().BeNull();

		await _registeredGamesRepository.Received(1).GetAsync(invalidGameId);
	}
}
