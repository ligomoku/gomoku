using GomokuServer.Application.Games.Commands.Abstract;

namespace GomokuServer.Application.Games.Commands;

public record PlaceRegisteredTileCommand : PlaceTileCommand;

public class PlaceRegisteredTileCommandHandler(IRegisteredGamesRepository _registeredGamesRepository)
	: PlaceTileCommandHandler<PlaceRegisteredTileCommand>(_registeredGamesRepository);

public record PlaceAnonymousTileCommand : PlaceTileCommand;

public class PlaceAnonymousTileCommandHandler(IAnonymousGamesRepository _anonymousGamesRepository)
	: PlaceTileCommandHandler<PlaceAnonymousTileCommand>(_anonymousGamesRepository);
