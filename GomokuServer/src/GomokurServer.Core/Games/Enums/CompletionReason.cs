namespace GomokuServer.Core.Games.Enums;

public enum CompletionReason
{
	NotCompletedYet = 0,
	MadeFiveInARow = 1,
	TieOnTheBoard = 2,
	TimeOut = 3,
	Resign = 4,
}
