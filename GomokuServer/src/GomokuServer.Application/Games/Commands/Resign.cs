
namespace GomokuServer.Application.Games.Commands;

public record ResignCommand : ICommand
{
	[Required]
	public required string GameId { get; init; }

	public string? PlayerId { get; init; }
}

public class ResignCommandHandler : ICommandHandler<ResignCommand>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymousGamesRepository _anonymousGamesRepository;

	public ResignCommandHandler(IRegisteredGamesRepository registeredGamesRepository, IAnonymousGamesRepository anonymousGamesRepository)
	{
		_registeredGamesRepository = registeredGamesRepository;
		_anonymousGamesRepository = anonymousGamesRepository;
	}

	public async Task<Result> Handle(ResignCommand request, CancellationToken cancellationToken)
	{
		if (request.PlayerId == null)
		{
			return Result.NotFound();
		}

		var getRegisteredGameResult = await _registeredGamesRepository.GetAsync(request.GameId);

		if (getRegisteredGameResult.IsSuccess)
		{
			return await TryResign(_registeredGamesRepository, getRegisteredGameResult, request.PlayerId);
		}

		var getAnonymousGameResult = await _anonymousGamesRepository.GetAsync(request.GameId);
		return await TryResign(_anonymousGamesRepository, getAnonymousGameResult, request.PlayerId);
	}

	public async Task<Result> TryResign(IGamesRepository gamesRepository, Result<Game> getGameResult, string playerId)
	{
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}

		var game = getGameResult.Value;
		var resignResult = game.Resign(playerId);

		if (!resignResult.IsValid) 
		{
			return Result.Invalid(new ValidationError(resignResult.ValidationError.ToString()));
		}

		return await gamesRepository.SaveAsync(game);
	}
}
