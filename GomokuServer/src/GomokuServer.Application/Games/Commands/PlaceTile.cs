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
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymousGamesRepository _anonymousGamesRepository;

	public PlaceTileCommandHandler(
		IRegisteredGamesRepository registeredGamesRepository,
		IAnonymousGamesRepository anonymousGamesRepository
	)
	{
		_registeredGamesRepository = registeredGamesRepository;
		_anonymousGamesRepository = anonymousGamesRepository;
	}

	public async Task<Result<PlaceTileResponse>> Handle(PlaceTileCommand request, CancellationToken cancellationToken)
	{
		var getRegisteredGameResult = await _registeredGamesRepository.GetAsync(request.GameId);

		if (getRegisteredGameResult.IsSuccess)
		{
			return await TryPlaceTile(_registeredGamesRepository, getRegisteredGameResult, request);
		}

		var getAnonymousGameResult = await _anonymousGamesRepository.GetAsync(request.GameId);
		return await TryPlaceTile(_anonymousGamesRepository, getAnonymousGameResult, request);
	}

	private async Task<Result<PlaceTileResponse>> TryPlaceTile(IGamesRepository gamesRepository, Result<Game> getGameResult, PlaceTileCommand request)
	{
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}

		var game = getGameResult.Value;
		var tileDto = request.Tile;

		var currentColor = game.NextTileColor;
		var tilePlacementResult = game.PlaceTile(new Tile(tileDto.X, tileDto.Y), request.PlayerId);

		if (!tilePlacementResult.IsValid)
		{
			return Result.Invalid(new ValidationError(tilePlacementResult.ValidationError.ToString()));
		}

		var saveResult = await gamesRepository.SaveAsync(game);
		return saveResult.Map(_ =>
		{
			var winningSequence = game.WinningSequence?.Select(tile => new TileDto(tile.X, tile.Y)).ToList();
			var placedTileColor = currentColor.ToString()!.ToCamelCase();
			var placeTileResponse = new PlaceTileResponse(placedTileColor!, winningSequence)
			{
				RemainingTimeInSeconds = game is GameWithTimeControl gameWithTimeControl ? gameWithTimeControl.GetRemainingTime(request.PlayerId) : null
			};

			return placeTileResponse;
		});
	}
}
