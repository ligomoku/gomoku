namespace GomokuServer.Core.Games.Validations;

public enum TilePlacementValidationError
{
	OtherPlayerTurnNow = 0,
	TileAlreadyOcupied = 1,
	TileIndexOutOfTheBoardRange = 2,
	GameNotStartedYet = 3,
	GameIsOver = 4,
	PlayerIsNotInvolvedInAGame = 5,
	NotBothPlayerAreJoinedYet = 6,
	TimeOut = 7,
}
