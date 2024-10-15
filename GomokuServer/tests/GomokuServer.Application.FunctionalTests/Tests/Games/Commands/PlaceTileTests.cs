using Ardalis.Result;

using GomokuServer.Application.Games.Commands;
using GomokuServer.Application.Games.Dto;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class PlaceTileTests : FunctionalTestBase
{
	[Test]
	public async Task PlaceTile_PassExistingPlayerIdAndRegisteredGameId_ShouldSuccessfullyPlaceTileInRegisteredGame()
	{
		// Arrange
		var game = _testDataProvider.GetGame_TwoPlayersJoined_NoMoves();
		await RegisteredGamesRepository.SaveAsync(game);

		// Act
		var placeTileResult = await SendAsync(new PlaceTileCommand
		{
			GameId = game.GameId,
			PlayerId = game.Players.Black!.Id,
			Tile = new TileDto(0, 0)
		});

		// Assert
		placeTileResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await RegisteredGamesRepository.GetAsync(game.GameId);
		getUpdatedGameResult.Value.MovesHistory.Count.Should().Be(1);

		var getAnonymousGameResult = await AnonymousGamesRepository.GetAsync(game.GameId);
		getAnonymousGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task PlaceTile_PassExistingPlayerIdAndAnonymousGameId_ShouldSuccessfullyPlaceTileInAnonymousGame()
	{
		// Arrange
		var game = _testDataProvider.GetGame_TwoPlayersJoined_NoMoves();
		await AnonymousGamesRepository.SaveAsync(game);

		// Act
		var placeTileResult = await SendAsync(new PlaceTileCommand
		{
			GameId = game.GameId,
			PlayerId = game.Players.Black!.Id,
			Tile = new TileDto(0, 0)
		});

		// Assert
		placeTileResult.Status.Should().Be(ResultStatus.Ok);

		var getUpdatedGameResult = await AnonymousGamesRepository.GetAsync(game.GameId);
		getUpdatedGameResult.Value.MovesHistory.Count.Should().Be(1);

		var getRegisteredGameResult = await RegisteredGamesRepository.GetAsync(game.GameId);
		getRegisteredGameResult.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task PlaceTile_PassNonExistingGameId_ShouldReturnNotFound()
	{
		// Act
		var placeTileResult = await SendAsync(new PlaceTileCommand
		{
			GameId = "nonExistingGameId",
			PlayerId = "somePlayerId",
			Tile = new TileDto(0, 0)
		});

		// Assert
		placeTileResult.Status.Should().Be(ResultStatus.NotFound);
	}
}
