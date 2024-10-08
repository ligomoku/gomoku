using GomokuServer.Application.Interfaces.Common;

using Microsoft.Extensions.Logging;

namespace GomokuServer.Application.Games.Commands;

public record AddPlayerToGameCommand : ICommand
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required string PlayerId { get; init; }
}

public class AddPlayerToGameCommandHandler : ICommandHandler<AddPlayerToGameCommand>
{
	private readonly IGameRepository _gameRepository;
	private readonly IProfilesRepository _profilesRepository;
	private readonly ILogger<AddPlayerToGameCommandHandler> _logger;

	public AddPlayerToGameCommandHandler(
		IGameRepository gameRepository,
		IProfilesRepository profilesRepository,
		ILogger<AddPlayerToGameCommandHandler> logger)
	{
		_gameRepository = gameRepository;
		_profilesRepository = profilesRepository;
		_logger = logger;
	}

	public async Task<Result> Handle(AddPlayerToGameCommand request, CancellationToken cancellationToken)
	{
		_logger.LogInformation($"Attempting to add player {request.PlayerId} to game {request.GameId}");

		// Check if game exists
		var getGameResult = await _gameRepository.GetAsync(request.GameId);
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			_logger.LogWarning($"Game with ID {request.GameId} not found.");
			return Result.NotFound($"Game with ID {request.GameId} not found");
		}

		// Check if player exists
		var getProfileResult = await _profilesRepository.GetAsync(request.PlayerId);
		if (getProfileResult.Status == ResultStatus.NotFound)
		{
			_logger.LogWarning($"Player with ID {request.PlayerId} not found.");
			return Result.NotFound($"Player with ID {request.PlayerId} not found");
		}

		// Log a generic error if the result is not successful
		if (getProfileResult.Status != ResultStatus.Ok)
		{
			_logger.LogError($"Error fetching player with ID {request.PlayerId}. Status: {getProfileResult.Status}");
			return Result.Error($"Error fetching player with ID {request.PlayerId}");
		}

		// Add player to game
		var game = getGameResult.Value;
		var addingResult = game.AddOpponent(getProfileResult.Value);

		if (!addingResult.IsValid)
		{
			_logger.LogWarning($"Validation failed when adding player {request.PlayerId} to game {request.GameId}: {addingResult.ValidationError}");
			return Result.Invalid(new ValidationError(addingResult.ValidationError.ToString()));
		}

		// Save updated game
		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status != ResultStatus.Ok)
		{
			_logger.LogError($"Failed to save the game after adding player {request.PlayerId}.");
			return Result.Error("Failed to save game changes");
		}

		_logger.LogInformation($"Player {request.PlayerId} successfully added to game {request.GameId}");
		return Result.Success();
	}
}
