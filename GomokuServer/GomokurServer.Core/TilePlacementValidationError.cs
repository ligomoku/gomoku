namespace GomokuServer.Core;

public enum TilePlacementValidationError
{
	SamePlayerMadeSecondMoveInARow = 0,
	TileAlreadyOcupied = 1,
	TileIndexOutOfTheBoardRange = 2,
}
