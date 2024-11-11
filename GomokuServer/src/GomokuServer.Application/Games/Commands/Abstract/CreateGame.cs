﻿namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract record CreateGameCommand : ICommand<CreateGameResponse>
{
	[Required]
	public required int BoardSize { get; init; }

	public TimeControlDto? TimeControl { get; init; }
}

public abstract class CreateGameCommandHandler<TRequest>(
	IGamesRepository _gamesRepository,
	IDateTimeProvider _dateTimeProvider,
	IRandomProvider _randomProvider)
	: ICommandHandler<TRequest, CreateGameResponse>
		where TRequest : CreateGameCommand
{
	private const int BOARD_MIN_SIZE = 13;
	private const int BOARD_MAX_SIZE = 19;

	public virtual async Task<Result<CreateGameResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		if (request.BoardSize < BOARD_MIN_SIZE || request.BoardSize > BOARD_MAX_SIZE)
		{
			return Result.Invalid(new ValidationError($"Board size cannot be less than {BOARD_MIN_SIZE} and more than {BOARD_MAX_SIZE}"));
		}

		Game game;

		if (request.TimeControl != null)
		{
			var timeControl = new TimeControl(request.TimeControl.InitialTimeInSeconds, request.TimeControl.IncrementPerMove);
			game = new GameWithTimeControl(request.BoardSize, timeControl, _randomProvider, _dateTimeProvider);
		}
		else
		{
			game = new Game(request.BoardSize, _randomProvider, _dateTimeProvider);
		}

		var saveResult = await _gamesRepository.SaveAsync(game);
		return saveResult.Map(_ => new CreateGameResponse(game.GameId, game.BoardSize));
	}
}