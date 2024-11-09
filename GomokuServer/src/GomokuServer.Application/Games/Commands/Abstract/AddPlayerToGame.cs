using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record AddPlayerToGameCommand : ICommand<AddPlayerToGameResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public abstract class AddPlayerToGameCommandHandler<TRequest>(IGamesRepository _gamesRepository)
	: ICommandHandler<TRequest, AddPlayerToGameResponse>
		where TRequest : AddPlayerToGameCommand
{
	public async Task<Result<AddPlayerToGameResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gamesRepository.GetAsync(request.GameId);

		if (!getGameResult.IsSuccess)
		{
			return Result.NotFound($"Game with ID {request.GameId} not found");
		}

		var playerProfile = await GetProfileAsync(request);

		if (playerProfile.IsNotFound())
		{
			return Result.NotFound($"Player not found");
		}

		var game = getGameResult.Value;
		var addingResult = game.AddOpponent(playerProfile);

		if (!addingResult.IsValid)
		{
			return Result.Invalid(new ValidationError(addingResult.ValidationError.ToString()));
		}

		var saveResult = await _gamesRepository.SaveAsync(game);
		if (!saveResult.IsSuccess)
		{
			return Result.Error("Failed to save game. See logs for more details");
		}

		return Result.Success(new AddPlayerToGameResponse(request.GameId, playerProfile.Value.Id));
	}

	public abstract Task<Result<Profile>> GetProfileAsync(TRequest request);
}
