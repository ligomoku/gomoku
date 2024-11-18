namespace GomokuServer.Core.Games.Validations;

public enum GameActionValidationError
{
	NotBothPlayersAreJoinedYet = 0,
	PlayerAlreadyAddedToGame = 1,
	BothPlacesTakenAlready = 2,
	PlayerIsNotInvolvedInAGame = 3,
	GameNotStartedYet = 4,
	GameIsOver = 5,
	GameIsNotOverYet = 6,
}
