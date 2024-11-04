using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Profiles.Entities;

using NSubstitute;

namespace GomokuServer.Application.FunctionalTests.TestData;

public class TestDataProvider
{
	private readonly int _boardSize = 19;
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public TestDataProvider()
	{
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);
	}

	public Game GetGame_NoPlayersJoined(IDateTimeProvider? dateTimeProvider = null)
	{
		return new Game(_boardSize, _randomProvider, dateTimeProvider ?? _dateTimeProvider);
	}

	public Game GetGame_OnePlayerJoined(IDateTimeProvider? dateTimeProvider = null)
	{
		var game = new Game(_boardSize, _randomProvider, dateTimeProvider ?? _dateTimeProvider);

		game.AddOpponent(new Profile("player1Id", "player1Username"));

		return game;
	}

	public Game GetGame_TwoPlayersJoined_NoMoves(IDateTimeProvider? dateTimeProvider = null)
	{
		var game = new Game(_boardSize, _randomProvider, dateTimeProvider ?? _dateTimeProvider);

		game.AddOpponent(new Profile("PlayerOne", "Alice"));
		game.AddOpponent(new Profile("PlayerTwo", "Bob"));

		return game;
	}

	public Game GetGame_HasWinner(IDateTimeProvider? dateTimeProvider = null)
	{
		var game = new Game(_boardSize, _randomProvider, dateTimeProvider ?? _dateTimeProvider);

		game.AddOpponent(new Profile("PlayerOne", "Alice"));
		game.AddOpponent(new Profile("PlayerTwo", "Bob"));

		game.PlaceTile(new Tile(0, 0), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(0, 1), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(1, 1), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(0, 2), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(2, 2), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(0, 3), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(3, 3), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(0, 4), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(4, 4), game.CurrentPlayer!.Id);

		return game;
	}

	public GameWithTimeControl GetGameWithTimeControl_HasWinner(IDateTimeProvider? dateTimeProvider = null)
	{
		var game = new GameWithTimeControl(_boardSize, new TimeControl(180, 2), _randomProvider, dateTimeProvider ?? _dateTimeProvider);

		game.AddOpponent(new Profile("PlayerOne", "Alice"));
		game.AddOpponent(new Profile("PlayerTwo", "Bob"));

		game.PlaceTile(new Tile(0, 0), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(0, 1), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(1, 1), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(0, 2), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(2, 2), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(0, 3), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(3, 3), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(0, 4), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(4, 4), game.CurrentPlayer!.Id);

		return game;
	}
}
