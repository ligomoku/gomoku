﻿using GomokuServer.Application.Games.Queries;
using GomokuServer.Application.UnitTests.TestData;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetGameCurrentStateTests
{
	private TestDataProvider _testDataProvider;
	private IGameRepository _gameRepository;
	private GetGameCurrentStateQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_gameRepository = Substitute.For<IGameRepository>();
		_handler = new GetGameCurrentStateQueryHandler(_gameRepository);
	}

	[Test]
	public async Task GetGameInformation_HasGameWithOnePlayer_ShouldReturnGameInfoSuccessfully()
	{
		// Arrange
		var game = _testDataProvider.GetGame_OnePlayerJoined();

		_gameRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetGameCurrentStateQuery { GameId = game.GameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.GameId.Should().Be(game.GameId);
		getGameResponse.HasBothPlayersJoined.Should().BeFalse();
		getGameResponse.IsGameStarted.Should().BeFalse();
		getGameResponse.NextMoveShouldMakePlayerId.Should().BeNull();
		getGameResponse.Players!.Black!.Should().BeNull();
		getGameResponse.Players!.White.Should().BeNull();
		getGameResponse.HasBothPlayersJoined!.Should().BeFalse();
		getGameResponse.MovesHistory.Should().BeEmpty();
		getGameResponse.Winner.Should().BeNull();
		getGameResponse.WinningSequence.Should().BeNull();

		await _gameRepository.Received(1).GetAsync(game.GameId);
	}

	[Test]
	public async Task GetGameInformation_BothPlayersJoined_NoMoves_ShouldReturnGameInfoSuccessfully()
	{
		// Arrange
		var game = _testDataProvider.GetGame_TwoPlayersJoined_NoMoves();
		_gameRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetGameCurrentStateQuery { GameId = game.GameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.GameId.Should().Be(game.GameId);
		getGameResponse.HasBothPlayersJoined.Should().BeTrue();
		getGameResponse.IsGameStarted.Should().BeFalse(); // No moves have been made
		getGameResponse.NextMoveShouldMakePlayerId.Should().Be(game.NextMoveShouldMakePlayerId);
		getGameResponse.Players!.Black!.PlayerId.Should().Be(game.Players!.Black!.Id);
		getGameResponse.Players!.White!.PlayerId.Should().Be(game.Players!.White!.Id);
		getGameResponse.MovesHistory.Should().BeEmpty();
		getGameResponse.Winner.Should().BeNull();
		getGameResponse.WinningSequence.Should().BeNull();

		await _gameRepository.Received(1).GetAsync(game.GameId);
	}

	[Test]
	public async Task GetGameInformation_GameHasWinner_ShouldReturnGameInfoWithWinner()
	{
		// Arrange
		var game = _testDataProvider.GetGame_HasWinner();
		_gameRepository.GetAsync(game.GameId).Returns(Task.FromResult(Result.Success(game)));

		var query = new GetGameCurrentStateQuery { GameId = game.GameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);

		var getGameResponse = result.Value;
		getGameResponse.GameId.Should().Be(game.GameId);
		getGameResponse.HasBothPlayersJoined.Should().BeTrue();
		getGameResponse.IsGameStarted.Should().BeTrue();
		getGameResponse.NextMoveShouldMakePlayerId.Should().BeNull();
		getGameResponse.Winner?.PlayerId.Should().Be(game.Winner?.Id);
		getGameResponse.WinningSequence.Should().NotBeNull();
		getGameResponse.WinningSequence.Should().HaveCount(game.WinningSequence!.Count);
		foreach (var tile in game.WinningSequence)
		{
			getGameResponse.WinningSequence.Should().Contain(t => t.X == tile.X && t.Y == tile.Y);
		}

		await _gameRepository.Received(1).GetAsync(game.GameId);
	}

	[Test]
	public async Task GetGameInformation_GameNotFound_ShouldReturnNotFound()
	{
		// Arrange
		var invalidGameId = "InvalidGameId";
		_gameRepository.GetAsync(invalidGameId).Returns(Task.FromResult(Result<Game>.NotFound()));

		var query = new GetGameCurrentStateQuery { GameId = invalidGameId };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
		result.Value.Should().BeNull();

		await _gameRepository.Received(1).GetAsync(invalidGameId);
	}
}