﻿using Microsoft.Extensions.Logging;

namespace GomokuServer.Application.Games.Commands;

public record AddPlayerToGameCommand : ICommand<AddPlayerToGameResponse>
{
	[Required]
	public required string GameId { get; init; }

	public string? PlayerId { get; init; }
}

public class AddPlayerToGameCommandHandler : ICommandHandler<AddPlayerToGameCommand, AddPlayerToGameResponse>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymusGamesRepository _anonymusGamesRepository;
	private readonly IProfilesRepository _profilesRepository;
	private readonly ILogger<AddPlayerToGameCommandHandler> _logger;

	public AddPlayerToGameCommandHandler(
		IRegisteredGamesRepository registeredGamesRepository,
		IAnonymusGamesRepository anonymusGamesRepository,
		IProfilesRepository profilesRepository,
		ILogger<AddPlayerToGameCommandHandler> logger)
	{
		_registeredGamesRepository = registeredGamesRepository;
		_anonymusGamesRepository = anonymusGamesRepository;
		_profilesRepository = profilesRepository;
		_logger = logger;
	}

	public async Task<Result<AddPlayerToGameResponse>> Handle(AddPlayerToGameCommand request, CancellationToken cancellationToken)
	{
		var isAnonymusGame = request.PlayerId == null;

		if (isAnonymusGame)
		{
			var playerId = Guid.NewGuid().ToString();
			var anonymus = new Profile(playerId, $"Guest {playerId[..6]}");

			return await TryAddPlayerToGame(_anonymusGamesRepository, request.GameId, anonymus);
		}

		var getProfileResult = await _profilesRepository.GetAsync(request.PlayerId!);
		if (getProfileResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound($"Player with ID {request.PlayerId} not found");
		}

		if (getProfileResult.Status != ResultStatus.Ok)
		{
			return Result.Error($"Error fetching player with ID {request.PlayerId}");
		}

		return await TryAddPlayerToGame(_registeredGamesRepository, request.GameId, getProfileResult.Value);
	}

	private async Task<Result<AddPlayerToGameResponse>> TryAddPlayerToGame(IGamesRepository gamesRepository, string gameId, Profile newOpponent)
	{
		var getGameResult = await gamesRepository.GetAsync(gameId);
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound($"Game with ID {gameId} not found");
		}

		var game = getGameResult.Value;
		var addingResult = game.AddOpponent(newOpponent);

		if (!addingResult.IsValid)
		{
			return Result.Invalid(new ValidationError(addingResult.ValidationError.ToString()));
		}

		var saveResult = await _registeredGamesRepository.SaveAsync(game);
		if (saveResult.Status != ResultStatus.Ok)
		{
			return Result.Error("Failed to save game. See logs for more details");
		}

		return Result.Success(new AddPlayerToGameResponse(gameId, newOpponent.Id));
	}
}
