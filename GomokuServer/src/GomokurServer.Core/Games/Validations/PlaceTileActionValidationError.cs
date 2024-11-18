namespace GomokuServer.Core.Games.Validations;

public enum PlaceTileActionValidationError
{
	OtherPlayerTurnNow = 0,
	TileAlreadyOcupied = 1,
	TileIndexOutOfTheBoardRange = 2,
	GameNotStartedYet = 3,
	GameIsOver = 4,
	PlayerIsNotInvolvedInAGame = 5,
	TimeOut = 7,
}
