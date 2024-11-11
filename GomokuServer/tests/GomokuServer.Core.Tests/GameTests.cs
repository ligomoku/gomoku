using GomokuServer.Core.Common.Interfaces;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.UnitTests;

public class GameTests
{
	private GameSettings _gameSettings;
	private Players _players;
	private Game _game;
	private IDateTimeProvider _dateTimeProvider;

	[SetUp]
	public void SetUp()
	{
		_gameSettings = new GameSettings()
		{
			BoardSize = 15
		};
		var blackPlayer = new Player("Player1Id", "Player1UserName", TileColor.Black);
		var whitePlayer = new Player("Player2Id", "Player2UserName", TileColor.White);
		_players = new Players(blackPlayer, whitePlayer);
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_game = new Game(_gameSettings, _players, _dateTimeProvider)
		{
			GameId = Guid.NewGuid()
		};
	}

	[Test]
	public void PlaceTile_ValidTilePlacement_ShouldReturnTrue()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _game.PlaceTile(tile, _game.Players.Black.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Winner.Should().BeNull();
	}

	[Test]
	public void PlaceTile_InvalidTilePlacement_ShouldReturnFalse()
	{
		// Arrange
		var tile = new Tile(20, 20);

		// Act
		var result = _game.PlaceTile(tile, _game.Players.Black.Id);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.TileIndexOutOfTheBoardRange);
	}

	[Test]
	public void PlaceTile_ForPositionWhereTileAlreadyExists_ShouldReturnFalse()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var firstPlacement = _game.PlaceTile(tile, _game.Players.Black.Id);
		var secondPlacement = _game.PlaceTile(tile, _game.Players.White.Id);

		// Assert
		firstPlacement.IsValid.Should().BeTrue();
		secondPlacement.IsValid.Should().BeFalse();
		secondPlacement.ValidationError.Should().Be(TilePlacementValidationError.TileAlreadyOcupied);
	}

	[Test]
	public void PlaceTile_SamePlayerMakesTwoMovesInARow_ShouldReturnFalse()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var firstPlacement = _game.PlaceTile(tile, _game.Players.Black.Id);
		var secondPlacement = _game.PlaceTile(tile, _game.Players.Black.Id);

		// Assert
		firstPlacement.IsValid.Should().BeTrue();
		secondPlacement.IsValid.Should().BeFalse();
		secondPlacement.ValidationError.Should().Be(TilePlacementValidationError.OtherPlayerTurnNow);
		secondPlacement.ErrorDetails.Should().NotBeEmpty();
	}

	[Test]
	public void PlaceTile_BlackPlayerWinsHorizontally_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_game.PlaceTile(new(i, 7), _game.Players.Black.Id);
			_game.PlaceTile(new(i, 8), _game.Players.White.Id);
		}

		// Act
		var result = _game.PlaceTile(new(4, 7), _game.Players.Black.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Winner.Should().Be(_game.Players.Black);
		_game.WinningSequence.Should().BeEquivalentTo(new Tile[] {
			new(0, 7),
			new(1, 7),
			new(2, 7),
			new(3, 7),
			new(4, 7)
		});

		_game.CurrentPlayer.Should().Be(_game.Players.Black);
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.MadeFiveInARow);
	}

	[Test]
	public void PlaceTile_BlackPlayerWinsVertically_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_game.PlaceTile(new(7, i), _game.Players.Black.Id);
			_game.PlaceTile(new(8, i), _game.Players.White.Id);
		}

		// Act
		var result = _game.PlaceTile(new(7, 4), _game.Players.Black.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Winner.Should().Be(_game.Players.Black);
		_game.WinningSequence.Should().BeEquivalentTo(new Tile[] {
			new(7, 0),
			new(7, 1),
			new(7, 2),
			new(7, 3),
			new(7, 4)
		});

		_game.CurrentPlayer.Should().Be(_game.Players.Black);
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.MadeFiveInARow);
	}

	[Test]
	public void PlaceTile_BlackPlayerWinsDiagonally_ShouldDeclareWinnerAndReturnWinningTiles()
	{
		// Arrange
		_game.PlaceTile(new(0, 0), _game.Players.Black.Id);
		_game.PlaceTile(new(5, 5), _game.Players.White.Id);
		_game.PlaceTile(new(1, 1), _game.Players.Black.Id);
		_game.PlaceTile(new(6, 6), _game.Players.White.Id);
		_game.PlaceTile(new(2, 2), _game.Players.Black.Id);
		_game.PlaceTile(new(7, 7), _game.Players.White.Id);
		_game.PlaceTile(new(3, 3), _game.Players.Black.Id);
		_game.PlaceTile(new(8, 8), _game.Players.White.Id);

		// Act
		var result = _game.PlaceTile(new(4, 4), _game.Players.Black.Id);

		// Assert
		result.IsValid.Should().BeTrue();
		_game.Winner.Should().Be(_game.Players.Black);
		_game.WinningSequence.Should().BeEquivalentTo(new Tile[] {
			new(0, 0),
			new(1, 1),
			new(2, 2),
			new(3, 3),
			new(4, 4)
		});

		_game.CurrentPlayer.Should().Be(_game.Players.Black);
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.MadeFiveInARow);
	}

	[Test]
	public void PlaceTile_NoWinnerAfterMove_ShouldReturnNullForWinner()
	{
		// Arrange
		var tile = new Tile(7, 7);

		// Act
		var result = _game.PlaceTile(tile, _game.Players.Black.Id);

		// Assert
		_game.Winner.Should().BeNull();
	}

	[Test]
	public void PlaceTile_AfterGameIsWon_ShouldReturnGameOverError()
	{
		// Arrange
		for (int i = 0; i < 4; i++)
		{
			_game.PlaceTile(new(i, 7), _game.Players.Black.Id);
			_game.PlaceTile(new(i, 8), _game.Players.White.Id);
		}
		var winningMove = _game.PlaceTile(new(4, 7), _game.Players.Black.Id);

		// Act
		var result = _game.PlaceTile(new(9, 9), _game.Players.White.Id);

		// Assert
		result.IsValid.Should().BeFalse();
		result.ValidationError.Should().Be(TilePlacementValidationError.GameIsOver);
		result.ErrorDetails.Should().NotBeEmpty();
		_game.Winner.Should().Be(_game.Players.Black);
	}

	[Test]
	public void PlaceTile_AndMakeTie_ResultStatusAndReasonShouldBeCorrect()
	{
		// Arrage
		var gameSettings = new GameSettings { BoardSize = 1 };
		var game = new Game(gameSettings, _players, _dateTimeProvider)
		{
			GameId = Guid.NewGuid()
		};

		// Act
		game.PlaceTile(new(0, 0), game.Players.Black.Id);

		// Assert
		game.Result.Should().Be(GameResult.Tie);
		game.Status.Should().Be(GameStatus.Completed);
		game.CompletionReason.Should().Be(CompletionReason.TieOnTheBoard);
	}

	[Test]
	public void CreateGame_GameStatus_ShouldBe_NotStartedYet()
	{
		// Assert
		_game.Result.Should().Be(GameResult.NotCompletedYet);
		_game.Status.Should().Be(GameStatus.NotStartedYet);
		_game.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void CreateGame_WhenOneMoveIsMade_GameStatus_ShouldBe_InProgress()
	{
		// Act
		_game.PlaceTile(new(0, 0), _game.Players.Black.Id);

		// Assert
		_game.Result.Should().Be(GameResult.NotCompletedYet);
		_game.Status.Should().Be(GameStatus.InProgress);
		_game.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void Resign_WhenNoMovesAreMade_ShouldSetCorrectGameState()
	{
		// Act
		var resignResult = _game.Resign(_game.Players.Black.Id);

		// Assert
		resignResult.IsValid.Should().BeTrue();

		_game!.Winner!.Id.Should().Be(_game.Players.White.Id);
		_game.Result.Should().Be(GameResult.WhiteWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.Resign);
	}

	[Test]
	public void Resign_WhenOneMoveIsMade_ShouldSetCorrectGameState()
	{
		// Arrange
		_game.PlaceTile(new(0, 0), _game.Players.Black.Id);

		// Act
		var resignResult = _game.Resign(_game.Players.White.Id);

		// Assert
		resignResult.IsValid.Should().BeTrue();

		_game!.Winner!.Id.Should().Be(_game.Players.Black.Id);
		_game.Result.Should().Be(GameResult.BlackWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.Resign);
	}

	[Test]
	public void Resign_WhenTwoOrMoreMovesAreMade_ShouldSetCorrectGameState()
	{
		// Arrange
		_game.PlaceTile(new(0, 0), _game.Players.Black.Id);
		_game.PlaceTile(new(1, 1), _game.Players.White.Id);

		// Act
		var resignResult = _game.Resign(_game.Players.Black.Id);

		// Assert
		resignResult.IsValid.Should().BeTrue();

		_game!.Winner!.Id.Should().Be(_game.Players.White.Id);
		_game.Result.Should().Be(GameResult.WhiteWon);
		_game.Status.Should().Be(GameStatus.Completed);
		_game.CompletionReason.Should().Be(CompletionReason.Resign);
	}

	[Test]
	public void Resign_WhenGameIsOver_ShouldReturnValidationError()
	{
		// Arrange
		for (int i = 0; i < 5; i++)
		{
			_game.PlaceTile(new(i, 7), _game.Players.Black.Id);
			_game.PlaceTile(new(i, 8), _game.Players.White.Id);
		}

		// Act
		var resignResult = _game.Resign(_game.Players.Black.Id);

		// Assert
		resignResult.IsValid.Should().BeFalse();
		resignResult.ValidationError.Should().Be(ResignValidationError.GameIsOver);
		resignResult.ErrorDetails.Should().NotBeEmpty();
	}

	[Test]
	public void Rematch_WhenGameIsOver_ShouldCreateNewGame()
	{
		// Arrange
		for (int i = 0; i < 5; i++)
		{
			_game.PlaceTile(new(i, 7), _game.Players.Black.Id);
			_game.PlaceTile(new(i, 8), _game.Players.White.Id);
		}

		// Act
		var rematchResult = _game.Rematch(_game.Players.Black.Id);

		// Assert
		rematchResult.IsValid.Should().BeTrue();
		rematchResult.NewGame.Should().NotBeNull();
		rematchResult.NewGame!.GameSettings.Should().Be(_game.GameSettings);
		rematchResult.NewGame!.Players.Black.Should().BeEquivalentTo(_game.Players.White);
		rematchResult.NewGame!.Players.White.Should().BeEquivalentTo(_game.Players.Black);
		rematchResult.NewGame!.CurrentPlayer?.Id.Should().Be(_game.Players.White.Id);
		rematchResult.NewGame!.MovesHistory.Should().BeEmpty();
		rematchResult.NewGame!.Result.Should().Be(GameResult.NotCompletedYet);
		rematchResult.NewGame!.Status.Should().Be(GameStatus.NotStartedYet);
		rematchResult.NewGame!.CompletionReason.Should().Be(CompletionReason.NotCompletedYet);
	}

	[Test]
	public void Rematch_WhenGameIsNotOver_ShouldReturnCorrectValidationError()
	{
		// Act
		var rematchResult = _game.Rematch(_game.Players.Black.Id);

		// Assert
		rematchResult.IsValid!.Should().BeFalse();
		rematchResult.ValidationError.Should().Be(RematchValidationError.GameIsNotOverYet);
		rematchResult.ErrorDetails.Should().NotBeEmpty();
	}

	[Test]
	public void Rematch_WhenPlayerIsNotInvolved_ShouldReturnCorrectValidatioError()
	{
		// Arrange
		for (int i = 0; i < 5; i++)
		{
			_game.PlaceTile(new(i, 7), _game.Players.Black.Id);
			_game.PlaceTile(new(i, 8), _game.Players.White.Id);
		}

		// Act
		var rematchResult = _game.Rematch("someId");

		// Assert
		rematchResult.IsValid!.Should().BeFalse();
		rematchResult.ValidationError.Should().Be(RematchValidationError.PlayerIsNotInvolvedInAGame);
		rematchResult.ErrorDetails.Should().NotBeEmpty();
	}

	[Test]
	public void MakeMoves_MovesHistoryShouldBeCorrect()
	{
		// Act
		_game.PlaceTile(new(0, 0), _game.Players.Black.Id);
		_game.PlaceTile(new(0, 1), _game.Players.White.Id);
		_game.PlaceTile(new(1, 1), _game.Players.Black.Id);

		// Assert
		_game.MovesHistory.Count.Should().Be(3);
		_game.MovesHistory[1].X.Should().Be(0);
		_game.MovesHistory[1].Y.Should().Be(0);
		_game.MovesHistory[2].X.Should().Be(0);
		_game.MovesHistory[2].Y.Should().Be(1);
		_game.MovesHistory[3].X.Should().Be(1);
		_game.MovesHistory[3].Y.Should().Be(1);
	}

	[Test]
	public void EachPlayerMakeMoves_NextMovePlayerIdShouldBeCorrect()
	{
		// Assert 
		_game.CurrentPlayer?.Id.Should().Be(_game.Players.Black.Id);
		_game.Players.Black.Color.Should().Be(TileColor.Black);
		_game.Players.White.Color.Should().Be(TileColor.White);

		_game.PlaceTile(new(0, 0), _game.Players.Black.Id);
		_game.CurrentPlayer?.Id.Should().Be(_game.Players.White.Id);

		_game.PlaceTile(new(1, 1), _game.Players.White.Id);
		_game.CurrentPlayer?.Id.Should().Be(_game.Players.Black.Id);
	}
}
