using GomokuServer.Core.Games.Extensions;

namespace GomokuServer.Application.Games.Commands;

public record ResignCommand : ICommand<ResignResponse>
{
	[Required]
	public required string GameId { get; init; }

	public string? PlayerId { get; init; }
}

public class ResignCommandHandler : ICommandHandler<ResignCommand, ResignResponse>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymousGamesRepository _anonymousGamesRepository;

	public ResignCommandHandler(IRegisteredGamesRepository registeredGamesRepository, IAnonymousGamesRepository anonymousGamesRepository)
	{
		_registeredGamesRepository = registeredGamesRepository;
		_anonymousGamesRepository = anonymousGamesRepository;
	}

	public async Task<Result<ResignResponse>> Handle(ResignCommand request, CancellationToken cancellationToken)
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

	public async Task<Result<ResignResponse>> TryResign(IGamesRepository gamesRepository, Result<Game> getGameResult, string playerId)
	{
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}

		var game = getGameResult.Value;
		var resignResult = game.Resign(playerId);

		if (!resignResult.IsValid)
		{
			return Result.Invalid(new ValidationError(resignResult.ErrorDetails));
		}

		var saveResult = await gamesRepository.SaveAsync(game);

		return saveResult.Map(_ => new ResignResponse() { Winner = new PlayerDto(game.Winner!.Id, game.Winner.UserName, game.Winner.Color.GetString()) });
	}
}
