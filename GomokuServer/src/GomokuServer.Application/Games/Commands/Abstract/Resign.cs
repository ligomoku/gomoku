using GomokuServer.Core.Games.Extensions;

namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record ResignCommand : ICommand<ResignResponse>
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required string PlayerId { get; init; }
}

public abstract class ResignCommandHandler<TRequest>(IGamesRepository _gamesRepository, IPlayersAwaitingGameRepository _playersAwaitingGameRepository)
	: ICommandHandler<TRequest, ResignResponse>
		where TRequest : ResignCommand
{
	public async Task<Result<ResignResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var gameId = Guid.Parse(request.GameId);

		var getGameResult = await _gamesRepository.GetAsync(gameId);

		if (!getGameResult.IsSuccess)
		{
			if (getGameResult.IsNotFound())
			{
				var getPlayersAwaitingGameResult = await _playersAwaitingGameRepository.GetAsync(gameId);

				if (getPlayersAwaitingGameResult.IsSuccess)
				{
					return Result.Invalid(new ValidationError("Game is not started yet. Wait for your opponent"));
				}

				return Result.NotFound("Game not found");
			}

			return Result.Error("Can't find game");
		}

		var game = getGameResult.Value;
		var resignResult = game.Resign(request.PlayerId);

		if (!resignResult.IsValid)
		{
			return Result.Invalid(new ValidationError(resignResult.ErrorDetails));
		}

		var saveResult = await _gamesRepository.SaveAsync(game);

		return saveResult.Map(_ => new ResignResponse() { Winner = new PlayerDto(game.Winner!.Id, game.Winner.UserName, game.Winner.Color.GetString()) });
	}
}
