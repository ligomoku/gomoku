namespace GomokuServer.Core.Games.Validations;

public enum RematchValidationError
{
	PlayerIsNotInvolvedInAGame = 0,
	GameIsOver = 1,
	NotBothPlayersJoined = 2,
	RematchNotAllowed = 3,
	GameAlreadyInProgress = 4
}
