namespace GomokuServer.Application.Games.Commands;

public record RematchCommand : ICommand<RematchResponse>
{
	[Required]
	public required string GameId { get; init; }
	public string? PlayerId { get; init; }
	public bool IsApproval { get; init; }
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
			return await ProcessRematch(getRegisteredGameResult, request);
		}

		var getAnonymousGameResult = await _anonymousGamesRepository.GetAsync(request.GameId);
		return await ProcessRematch(getAnonymousGameResult, request);
	}

	private Task<Result<RematchResponse>> ProcessRematch(Result<Game> getGameResult, RematchCommand request)
	{
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Task.FromResult<Result<RematchResponse>>(Result.NotFound());
		}

		var game = getGameResult.Value;

		if (!game.IsInvolved(request.PlayerId!).isInvolved)
		{
			return Task.FromResult<Result<RematchResponse>>(Result.Invalid(new ValidationError("Player is not involved in this game.")));
		}

		if (!request.IsApproval)
		{
			return Task.FromResult(Result.Success(new RematchResponse { GameId = request.GameId }));
		}
		else
		{
			var newGame = game.Rematch(request.PlayerId!, request.IsApproval);
			if (newGame == null)
			{
				return Task.FromResult<Result<RematchResponse>>(Result.Invalid(new ValidationError("Rematch not allowed. Either the game is still in progress or the player is not involved.")));
			}

			// var saveResult = await _registeredGamesRepository.SaveAsync(newGame)
			// 				?? await _anonymousGamesRepository.SaveAsync(newGame);
			//
			// return saveResult.Map(_ => new RematchResponse { GameId = newGame.GameId });
			return Task.FromResult(Result.Success(new RematchResponse { GameId = newGame.NewGame!.GameId }));
		}
	}
}
