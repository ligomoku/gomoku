using GomokuServer.Application.Games.Commands.Abstract;

namespace GomokuServer.Application.Games.Commands;

public record RegisteredRematchCommand : RematchCommand;

public class RegisteredRematchCommandHandler(IRegisteredGamesRepository _registeredGamesRepository)
	: RematchCommandHandler<RegisteredRematchCommand>(_registeredGamesRepository);

public record AnonymousRematchCommand : RematchCommand;

public class AnonymousRematchCommandHandler(IAnonymousGamesRepository _anonymousGamesRepository)
	: RematchCommandHandler<AnonymousRematchCommand>(_anonymousGamesRepository);
