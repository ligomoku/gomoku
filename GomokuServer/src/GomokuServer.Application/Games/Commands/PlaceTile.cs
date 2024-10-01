using GomokuServer.Application.Interfaces.Common;
using GomokuServer.Application.Responses;

namespace GomokuServer.Application.Games.Commands;

public record PlaceTileCommand : ICommand<PlaceTileResponse>
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required TileDto Tile { get; set; }

	[Required]
	public required string PlayerId { get; set; }
}

public class PlaceTileCommandHandler : ICommandHandler<PlaceTileCommand, PlaceTileResponse>
{
	private readonly IGameRepository _gameRepository;

	public PlaceTileCommandHandler(IGameRepository gameRepository)
	{
		_gameRepository = gameRepository;
	}

	public async Task<Result<PlaceTileResponse>> Handle(PlaceTileCommand request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gameRepository.GetAsync(request.GameId);
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}
		var game = getGameResult.Value;
		var tileDto = request.Tile;
		var tilePlacementResult = game.PlaceTile(new Tile(tileDto.X, tileDto.Y), request.PlayerId);

		if (!tilePlacementResult.IsValid)
		{
			return Result.Invalid(new ValidationError(tilePlacementResult.ValidationError.ToString()));
		}

		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status == ResultStatus.Error)
		{
			return Result.Error();
		}

		var winningSequence = tilePlacementResult.WinningSequence?.Select(tile => new TileDto(tile.X, tile.Y)).ToList();
		var placedTileColor = tilePlacementResult.PlacedTileColor.ToString();

		return Result.Success(new PlaceTileResponse(placedTileColor!, winningSequence));
	}
}
