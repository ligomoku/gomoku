using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.UnitTests.TestData;

public class TestDataProvider
{
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public TestDataProvider()
	{
		_randomProvider = Substitute.For<IRandomProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);

		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
	}

	public Game GetGameWithOnePlayer()
	{
		var game = new Game(new GameBoard(19), _randomProvider, _dateTimeProvider);

		game.AddPlayer(new Player("player1Id", "player1Username"));

		return game;
	}
}
