using GomokuServer.Core.Profiles.Entities;
namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record AddPlayerToGameCommand : ICommand<AddPlayerToGameResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public abstract class AddPlayerToGameCommandHandler<TRequest>(
	IAwaitingPlayersGamesRepository _awaitingPlayersGamesRepository,
	IGamesRepository _gamesRepository)
	: ICommandHandler<TRequest, AddPlayerToGameResponse>
		where TRequest : AddPlayerToGameCommand
{
	public async Task<Result<AddPlayerToGameResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var getAwaitingPlayersGameResult = await _awaitingPlayersGamesRepository.GetAsync(Guid.Parse(request.GameId));

		if (!getAwaitingPlayersGameResult.IsSuccess)
		{
			return Result.NotFound($"Game with ID {request.GameId} not found");
		}

		var playerProfile = await GetProfileAsync(request);

		if (playerProfile.IsNotFound())
		{
			return Result.NotFound($"Player not found");
		}

		var awaitingPlayersGame = getAwaitingPlayersGameResult.Value;
		var addPlayerResult = awaitingPlayersGame.AddPlayer(playerProfile);

		if (!addPlayerResult.IsValid)
		{
			return Result.Invalid(new ValidationError(addPlayerResult.ValidationError.ToString()));
		}

		if (addPlayerResult.CreatedGame != null)
		{
			var saveResult = await _gamesRepository.SaveAsync(addPlayerResult.CreatedGame);
			if (!saveResult.IsSuccess)
			{
				return Result.Error("Failed to save awaitingPlayersGame. See logs for more details");
			}
		}

		return Result.Success(new AddPlayerToGameResponse(request.GameId, playerProfile.Value.Id));
	}

	public abstract Task<Result<Profile>> GetProfileAsync(TRequest request);
}
