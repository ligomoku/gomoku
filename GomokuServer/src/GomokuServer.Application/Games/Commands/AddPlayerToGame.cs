using GomokuServer.Application.Interfaces.Common;

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

	public AddPlayerToGameCommandHandler(IGameRepository gameRepository, IProfilesRepository profilesRepository)
	{
		_gameRepository = gameRepository;
		_profilesRepository = profilesRepository;
	}

	public async Task<Result> Handle(AddPlayerToGameCommand request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gameRepository.GetAsync(request.GameId);
		if (getGameResult.Status == ResultStatus.NotFound)
		{
			return Result.NotFound();
		}

		var getProfileResult = await _profilesRepository.GetAsync(request.PlayerId);
		if (getProfileResult.Status != ResultStatus.Ok)
		{
			if (getProfileResult.IsNotFound())
			{
				return Result.NotFound($"Player with id {request.PlayerId} not found");
			}

			return Result.Error();
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
			return Result.Error();
		}

		return Result.Success();
	}
}
