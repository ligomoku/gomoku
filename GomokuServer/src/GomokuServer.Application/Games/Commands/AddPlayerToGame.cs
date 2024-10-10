using GomokuServer.Application.Common.Interfaces;
using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Application.Profiles.Interfaces;

using Microsoft.Extensions.Logging;

namespace GomokuServer.Application.Games.Commands;

public record AddPlayerToGameCommand : ICommand
{
	[Required]
	public required string GameId { get; init; }

	public string? PlayerId { get; init; }
}

public class AddPlayerToGameCommandHandler : ICommandHandler<AddPlayerToGameCommand>
{
	private readonly IGamesRepository _gameRepository;
	private readonly IProfilesRepository _profilesRepository;
	private readonly ILogger<AddPlayerToGameCommandHandler> _logger;

	public AddPlayerToGameCommandHandler(
		IGamesRepository gameRepository,
		IProfilesRepository profilesRepository,
		ILogger<AddPlayerToGameCommandHandler> logger)
	{
		_gameRepository = gameRepository;
		_profilesRepository = profilesRepository;
		_logger = logger;
	}

	public async Task<Result> Handle(AddPlayerToGameCommand request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gameRepository.GetAsync(request.GameId);
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound($"Game with ID {request.GameId} not found");
		}

		var getProfileResult = await _profilesRepository.GetAsync(request.PlayerId);
		if (getProfileResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound($"Player with ID {request.PlayerId} not found");
		}

		if (getProfileResult.Status != ResultStatus.Ok)
		{
			return Result.Error($"Error fetching player with ID {request.PlayerId}");
		}

		var game = getGameResult.Value;
		var addingResult = game.AddOpponent(getProfileResult.Value);

		if (!addingResult.IsValid)
		{
			return Result.Invalid(new ValidationError(addingResult.ValidationError.ToString()));
		}

		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status != ResultStatus.Ok)
		{
			return Result.Error("Failed to save game changes");
		}

		return Result.Success();
	}
}
