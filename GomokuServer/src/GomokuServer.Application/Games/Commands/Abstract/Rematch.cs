namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record RematchCommand : ICommand<RematchResponse>
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required string PlayerId { get; init; }
}

public abstract class RematchCommandHandler<TRequest>(IGamesRepository _gamesRepository)
	: ICommandHandler<TRequest, RematchResponse>
		where TRequest : RematchCommand
{
	public async Task<Result<RematchResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gamesRepository.GetAsync(Guid.Parse(request.GameId));
		if (!getGameResult.IsSuccess)
		{
			return Result.Error("Can't find game");
		}

		var game = getGameResult.Value;
		var rematchResult = game.Rematch(request.PlayerId);

		if (!rematchResult.IsValid)
		{
			return Result.Invalid(new ValidationError(rematchResult.ErrorDetails));
		}

		var saveResult = await _gamesRepository.SaveAsync(rematchResult.NewGame!);

		return saveResult.Map(_ => new RematchResponse() { NewGameId = rematchResult.NewGame!.GameId.ToString() });
	}
}
