
namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record UndoCommand : ICommand<UndoResponse>
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required string PlayerId { get; init; }
}

public abstract class UndoCommandHandler<TRequest>(IGamesRepository _gamesRepository)
	: ICommandHandler<TRequest, UndoResponse>
		where TRequest : UndoCommand
{
	public async Task<Result<UndoResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gamesRepository.GetAsync(Guid.Parse(request.GameId));

		return getGameResult.Bind(game =>
		{
			var undoResult = game.Undo(request.PlayerId);

			return undoResult.IsValid
				? Result.Success(new UndoResponse()
				{
					RemovedTile = TileDto.FromDomainModel(undoResult.RemovedTile),
					PreviouslyPlacedTile = TileDto.FromDomainModel(undoResult.PreviouslyPlacedTile)
				})
				: Result.Invalid(new ValidationError(undoResult.ErrorDetails));
		});
	}
}
