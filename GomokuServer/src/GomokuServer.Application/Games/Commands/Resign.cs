using GomokuServer.Application.Games.Commands.Abstract;

namespace GomokuServer.Application.Games.Commands;

public record RegisteredResignCommand : ResignCommand;

public class RegisteredResignCommandHandler(IRegisteredGamesRepository _registeredGamesRepository)
	: ResignCommandHandler<RegisteredResignCommand>(_registeredGamesRepository);

public record AnonymousResignCommand : ResignCommand;

public class AnonymousResignCommandHandler(IAnonymousGamesRepository _anonymousGamesRepository)
	: ResignCommandHandler<AnonymousResignCommand>(_anonymousGamesRepository);
