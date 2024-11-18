using GomokuServer.Application.Games.Commands.Abstract;

namespace GomokuServer.Application.Games.Commands;

public record RegisteredUndoCommand : UndoCommand;

public class RegisteredUndoCommandHandler(IRegisteredGamesRepository _registeredGamesRepository)
	: UndoCommandHandler<RegisteredUndoCommand>(_registeredGamesRepository);

public record AnonymousUndoCommand : UndoCommand;

public class AnonymousUndoCommandHandler(IAnonymousGamesRepository _anonymousGamesRepository)
	: UndoCommandHandler<AnonymousUndoCommand>(_anonymousGamesRepository);
