using GomokuServer.Application.Interfaces.Common;
using GomokuServer.Application.Responses;
using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.Games.Commands;

public record CreateGameCommand : ICommand<CreateGameResponse>
{
	[Required]
	public required int BoardSize { get; init; }

	[Required]
	public required string PlayerId { get; init; }
}

public class CreateGameCommandHandler : ICommandHandler<CreateGameCommand, CreateGameResponse>
{
	private const int BOARD_MIN_SIZE = 13;
	private const int BOARD_MAX_SIZE = 19;
	private readonly IGameRepository _gameRepository;
	private readonly IProfilesRepository _playersRepository;
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public CreateGameCommandHandler(IGameRepository gameRepository, IProfilesRepository playersRepository, IRandomProvider randomProvider, IDateTimeProvider dateTimeProvider)
	{
		_gameRepository = gameRepository;
		_playersRepository = playersRepository;
		_randomProvider = randomProvider;
		_dateTimeProvider = dateTimeProvider;
	}

	public async Task<Result<CreateGameResponse>> Handle(CreateGameCommand request, CancellationToken cancellationToken)
	{
		if (request.BoardSize < BOARD_MIN_SIZE || request.BoardSize > BOARD_MAX_SIZE)
		{
			return Result.Invalid(new ValidationError($"Board size cannot be less than {BOARD_MIN_SIZE} and more than {BOARD_MAX_SIZE}"));
		}

		var getPlayerResult = await _playersRepository.GetAsync(request.PlayerId);
		if (!getPlayerResult.IsSuccess)
		{
			return Result.Error("Cannot get user by id. See logs for more details");
		}

		var game = new Game(request.BoardSize, _randomProvider, _dateTimeProvider);
		var addPlayerResult = game.AddOpponent(getPlayerResult.Value);

		var saveResult = await _gameRepository.SaveAsync(game);
		if (saveResult.Status != ResultStatus.Ok)
		{
			return Result.Error();
		}

		return Result.Success(new CreateGameResponse(game.GameId));
	}
}
