namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record PlaceTileCommand : ICommand<PlaceTileResponse>
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required TileDto Tile { get; set; }

	[Required]
	public required string PlayerId { get; set; }
}

public abstract class PlaceTileCommandHandler<TRequest>(IGamesRepository _gamesRepository)
	: ICommandHandler<TRequest, PlaceTileResponse>
		where TRequest : PlaceTileCommand
{
	public async Task<Result<PlaceTileResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		return await _gamesRepository.GetAsync(Guid.Parse(request.GameId)).BindAsync(async game =>
		{
			var tileDto = request.Tile;

			var currentColor = game.NextTileColor;
			var tilePlacementResult = game.PlaceTile(new Tile(tileDto.X, tileDto.Y), request.PlayerId);

			if (!tilePlacementResult.IsValid)
			{
				return Result.Invalid(new ValidationError(tilePlacementResult.ErrorDetails));
			}

			return await _gamesRepository.SaveAsync(game).BindAsync(_ =>
			{
				var winningSequence = game.WinningSequence?.Select(tile => new TileDto(tile.X, tile.Y)).ToList();
				var placedTileColor = currentColor.ToString()!.ToCamelCase();
				var placeTileResponse = new PlaceTileResponse(placedTileColor!, winningSequence)
				{
					RemainingTimeInSeconds = game is GameWithTimeControl gameWithTimeControl ? gameWithTimeControl.GetRemainingTime(request.PlayerId) : null
				};

				return Task.FromResult(Result.Success(placeTileResponse));
			});
		});
	}
}
