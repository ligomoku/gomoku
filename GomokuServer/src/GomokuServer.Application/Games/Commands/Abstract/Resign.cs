using GomokuServer.Core.Games.Extensions;

namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record ResignCommand : ICommand<ResignResponse>
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required string PlayerId { get; init; }
}

public class ResignCommandHandler<TRequest>(IGamesRepository _gamesRepository)
	: ICommandHandler<TRequest, ResignResponse>
		where TRequest : ResignCommand
{
	public async Task<Result<ResignResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gamesRepository.GetAsync(Guid.Parse(request.GameId));

		if (!getGameResult.IsSuccess)
		{
			if (getGameResult.IsNotFound())
			{
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
