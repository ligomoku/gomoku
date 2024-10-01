using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.UnitTests.TestData;

public class TestDataProvider
{
	private readonly GameBoard _board = new(19);
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public TestDataProvider()
	{
		_randomProvider = Substitute.For<IRandomProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);

		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
	}

	public Game GetGame_OnePlayerJoined()
	{
		var game = new Game(_board, _randomProvider, _dateTimeProvider);

		game.AddPlayer(new Player("player1Id", "player1Username"));

		return game;
	}

	public Game GetGame_TwoPlayersJoined_NoMoves()
	{
		var game = new Game(_board, _randomProvider, _dateTimeProvider);

		game.AddPlayer(new Player("PlayerOne", "Alice"));
		game.AddPlayer(new Player("PlayerTwo", "Bob"));

		return game;
	}

	public Game GetGame_HasWinner()
	{
		var game = new Game(_board, _randomProvider, _dateTimeProvider);

		game.AddPlayer(new Player("PlayerOne", "Alice"));
		game.AddPlayer(new Player("PlayerTwo", "Bob"));

		game.PlaceTile(new Tile(0, 0), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(0, 1), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(1, 1), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(0, 2), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(2, 2), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(0, 3), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(3, 3), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(0, 4), game.NextMoveShouldMakePlayerId!);
		game.PlaceTile(new Tile(4, 4), game.NextMoveShouldMakePlayerId!);

		return game;
	}
}
