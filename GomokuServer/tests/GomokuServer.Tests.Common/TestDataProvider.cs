using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Profiles.Entities;

using NSubstitute;

namespace GomokuServer.Tests.Common;

public class TestDataProvider
{
	private readonly GameSettings _gameSettings;
	private readonly Players _players;
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public TestDataProvider()
	{
		_gameSettings = new GameSettings() { GameId = Guid.NewGuid(), BoardSize = 19 };
		var blackPlayer = new Player("Player1Id", "Player1UserName", TileColor.Black);
		var whitePlayer = new Player("Player2Id", "Player2UserName", TileColor.White);
		_players = new Players(blackPlayer, whitePlayer);
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_randomProvider.GetInt(0, 2).Returns(0);
	}

	public AwaitingPlayersGame GetAwaitingPlayersGame_NoPlayersJoined()
	{
		var settings = new AwaitingPlayersGameSettings()
		{
			BoardSize = 19
		};
		var game = new AwaitingPlayersGame(settings, _randomProvider, _dateTimeProvider);

		return game;
	}

	public AwaitingPlayersGame GetAwaitingPlayersGame_OnePlayerJoined()
	{
		var settings = new AwaitingPlayersGameSettings()
		{
			BoardSize = 19
		};
		var game = new AwaitingPlayersGame(settings, _randomProvider, _dateTimeProvider);
		game.AddPlayer(new Profile("id1", "username1"));

		return game;
	}

	public Game GetGame_NoMoves(IDateTimeProvider? dateTimeProvider = null)
	{
		return new Game(_gameSettings, _players, dateTimeProvider ?? _dateTimeProvider);
	}

	public Game GetGame_HasWinner(IDateTimeProvider? dateTimeProvider = null)
	{
		var game = new Game(_gameSettings, _players, dateTimeProvider ?? _dateTimeProvider);

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

	public Game GetGame_InProgress(IDateTimeProvider? dateTimeProvider = null)
	{
		var game = new Game(_gameSettings, _players, dateTimeProvider ?? _dateTimeProvider);

		game.PlaceTile(new Tile(0, 0), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(1, 1), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(2, 2), game.CurrentPlayer!.Id);
		game.PlaceTile(new Tile(3, 3), game.CurrentPlayer!.Id);

		return game;
	}

	public GameWithTimeControl GetGameWithTimeControl_HasWinner(IDateTimeProvider? dateTimeProvider = null)
	{
		var settings = new GameWithTimeControlSettings
		{
			GameId = Guid.NewGuid(),
			BoardSize = 19,
			TimeControl = new TimeControl(180, 2),
		};
		var game = new GameWithTimeControl(settings, _players, dateTimeProvider ?? _dateTimeProvider);

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
