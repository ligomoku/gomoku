namespace GomokuServer.Application.Games.Commands;

public record RematchCommand : ICommand<RematchResponse>
{
	[Required]
	public required string GameId { get; init; }
	public string? PlayerId { get; init; }
}

public class RematchCommandHandler : ICommandHandler<RematchCommand, RematchResponse>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymousGamesRepository _anonymousGamesRepository;

	public RematchCommandHandler(IRegisteredGamesRepository registeredGamesRepository, IAnonymousGamesRepository anonymousGamesRepository)
	{
		_registeredGamesRepository = registeredGamesRepository;
		_anonymousGamesRepository = anonymousGamesRepository;
	}

	public async Task<Result<RematchResponse>> Handle(RematchCommand request, CancellationToken cancellationToken)
	{
		if (request.PlayerId == null)
		{
			return Result.NotFound();
		}

		var getRegisteredGameResult = await _registeredGamesRepository.GetAsync(request.GameId);
		if (getRegisteredGameResult.IsSuccess)
		{
			return await ProcessRematch(_registeredGamesRepository, getRegisteredGameResult, request);
		}

		var getAnonymousGameResult = await _anonymousGamesRepository.GetAsync(request.GameId);
		return await ProcessRematch(_anonymousGamesRepository, getAnonymousGameResult, request);
	}

	private async Task<Result<RematchResponse>> ProcessRematch(IGamesRepository gamesRepository, Result<Game> getGameResult, RematchCommand request)
	{
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}
		
		var game = getGameResult.Value;
		var rematchResult = game.Rematch(request.PlayerId!);

		if (!rematchResult.IsValid)
		{
			return Result.Invalid(new ValidationError(rematchResult.ErrorDetails));
		}

		var saveResult = await gamesRepository.SaveAsync(rematchResult.NewGame!);

		return saveResult.Map(_ => new RematchResponse() { GameId = rematchResult.NewGame!.GameId });
	}
}
