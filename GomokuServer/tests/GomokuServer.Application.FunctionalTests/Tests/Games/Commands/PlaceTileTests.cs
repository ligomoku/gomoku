using Ardalis.Result;

using GomokuServer.Application.Games.Commands;
using GomokuServer.Application.Games.Dto;

namespace GomokuServer.Application.FunctionalTests.Tests.Games.Commands;

public class PlaceTileTests : FunctionalTestBase
{
	[Test]
	public async Task PlaceTile_PassExistingGameAndPlayerId_ShouldSuccessfullyPlaceTileInRegisteredGame()
	{
		// Arrange
		var game = _testDataProvider.GetGame_TwoPlayersJoined_NoMoves();
		var blackPlayer = game.Players.Black;
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
	}
}
