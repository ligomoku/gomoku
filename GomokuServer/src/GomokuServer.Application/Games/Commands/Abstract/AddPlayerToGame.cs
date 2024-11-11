using GomokuServer.Core.Profiles.Entities;
namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record AddPlayerToGameCommand : ICommand<AddPlayerToGameResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public abstract class AddPlayerToGameCommandHandler<TRequest>(
	IPlayersAwaitingGameRepository _playersAwaitingGameRepository,
	IGamesRepository _gamesRepository)
	: ICommandHandler<TRequest, AddPlayerToGameResponse>
		where TRequest : AddPlayerToGameCommand
{
	public async Task<Result<AddPlayerToGameResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var gameId = Guid.Parse(request.GameId);

		var getPlayersAwaitingGameResult = await _playersAwaitingGameRepository.GetAsync(gameId);

		if (!getPlayersAwaitingGameResult.IsSuccess)
		{
			return Result.NotFound($"Game with ID {request.GameId} not found");
		}

		var playerProfile = await GetProfileAsync(request);

		if (playerProfile.IsNotFound())
		{
			return Result.NotFound($"Player not found");
		}

		var playersAwaitingGame = getPlayersAwaitingGameResult.Value;
		var addPlayerResult = playersAwaitingGame.AddPlayer(playerProfile);

		if (!addPlayerResult.IsValid)
		{
			return Result.Invalid(new ValidationError(addPlayerResult.ErrorDetails));
		}

		if (addPlayerResult.CreatedGame != null)
		{
			var saveResult = await _gamesRepository.SaveAsync(addPlayerResult.CreatedGame);
			await _playersAwaitingGameRepository.DeleteAsync(gameId);

			if (!saveResult.IsSuccess)
			{
				return Result.Error("Failed to save playersAwaitingGame. See logs for more details");
			}
		}

		return Result.Success(new AddPlayerToGameResponse(request.GameId, playerProfile.Value.Id));
	}

	public abstract Task<Result<Profile>> GetProfileAsync(TRequest request);
}
