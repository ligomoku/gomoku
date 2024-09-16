namespace GomokuServer.Core;

public enum TilePlacementValidationError
{
	SamePlayerMadeSecondMoveInARow = 0,
	TileAlreadyOcupied = 1,
	TileIndexOutOfTheBoardRange = 2,
	GameNotStartedYet = 3,
	GameIsOver = 4,
	PlayerIsNotInvolvedInAGame = 5,
}
