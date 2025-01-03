﻿using GomokuServer.Application.Games.Dto;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.UnitTests.Games.Commands;

public class PlaceTileTests
{
	private GameSettings _gameSettings;
	private Players _players;
	private Game _game;
	private IRegisteredGamesRepository _registeredGamesRepository;
	private IAnonymousGamesRepository _anonymousGamesRepository;
	private IRandomProvider _randomProvider;
	private IDateTimeProvider _dateTimeProvider;
	private PlaceRegisteredTileCommandHandler _handler;

	[SetUp]
	public void Setup()
	{
		_gameSettings = new GameSettings { BoardSize = 15 };
		var blackPlayer = new Player("Player1Id", "Player1UserName", TileColor.Black);
		var whitePlayer = new Player("Player2Id", "Player2UserName", TileColor.White);
		_players = new Players(blackPlayer, whitePlayer);
		_game = Substitute.For<Game>(_gameSettings, _players, Substitute.For<IDateTimeProvider>());
		_registeredGamesRepository = Substitute.For<IRegisteredGamesRepository>();
		_anonymousGamesRepository = Substitute.For<IAnonymousGamesRepository>();
		_randomProvider = Substitute.For<IRandomProvider>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_handler = new PlaceRegisteredTileCommandHandler(_registeredGamesRepository);
	}

	[Test]
	public async Task PlaceTile_WithValidMove_ShouldReturnSuccess()
	{
		// Arrange
		var command = new PlaceRegisteredTileCommand
		{
			GameId = _game.GameId.ToString(),
			PlayerId = _players.Black.Id,
			Tile = new TileDto(0, 0)
		};
		var opponent = new Profile(command.PlayerId, "player1UserName");

		var game = new Game(_gameSettings, _players, _dateTimeProvider)
		{
			GameId = Guid.NewGuid()
		};

		_registeredGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result.Success(game));
		_registeredGamesRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.IsWinningMove.Should().BeFalse();
		result.Value.PlacedTileColor.Should().Be("black");
		await _registeredGamesRepository.Received(1).SaveAsync(game);
	}

	[Test]
	public async Task PlaceTile_GameNotFound_ShouldReturnNotFound()
	{
		// Arrange
		var command = new PlaceRegisteredTileCommand
		{
			GameId = _game.GameId.ToString(),
			PlayerId = "Player1",
			Tile = new TileDto(0, 0)
		};

		_registeredGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result<Game>.NotFound());
		_anonymousGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result<Game>.NotFound());

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.NotFound);
	}

	[Test]
	public async Task PlaceTile_WhenGameNotStarted_ShouldReturnInvalid()
	{
		// Arrange
		var command = new PlaceRegisteredTileCommand
		{
			GameId = _game.GameId.ToString(),
			PlayerId = "player1",
			Tile = new TileDto(0, 0)
		};

		var game = new Game(_gameSettings, _players, _dateTimeProvider)
		{
			GameId = Guid.NewGuid()
		};
		_registeredGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result.Success(game));

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
		await _registeredGamesRepository.DidNotReceive().SaveAsync(Arg.Any<Game>());
	}

	[Test]
	public async Task PlaceTile_WhenGameIsOver_ShouldReturnInvalid()
	{
		// Arrange
		var command = new PlaceRegisteredTileCommand
		{
			GameId = _game.GameId.ToString(),
			PlayerId = "player1Id",
			Tile = new TileDto(0, 0)
		};

		var game = new Game(_gameSettings, _players, Substitute.For<IDateTimeProvider>())
		{
			GameId = Guid.NewGuid()
		};

		_registeredGamesRepository.GetAsync(Guid.Parse(command.GameId)).Returns(Result.Success(game));
		_registeredGamesRepository.SaveAsync(Arg.Any<Game>()).Returns(Result.Success());

		for (int i = 0; i < 4; i++)
		{
			game.PlaceTile(new Tile(i, 7), game.Players!.Black!.Id);
			game.PlaceTile(new Tile(i, 8), game.Players!.White!.Id);
		}

		var winningMove = game.PlaceTile(new Tile(4, 7), game.Players!.Black!.Id);

		// Act
		var result = await _handler.Handle(command, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Invalid);
	}
}
