using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.Games.Commands;

public record CreateGameCommand : ICommand<CreateGameResponse>
{
	[Required]
	public required int BoardSize { get; init; }

	public string? PlayerId { get; init; }
}

public class CreateGameCommandHandler : ICommandHandler<CreateGameCommand, CreateGameResponse>
{
	private const int BOARD_MIN_SIZE = 13;
	private const int BOARD_MAX_SIZE = 19;
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymousGamesRepository _anonymousGamesRepository;
	private readonly IProfilesRepository _profilesRepository;
	private readonly IRandomProvider _randomProvider;
	private readonly IDateTimeProvider _dateTimeProvider;

	public CreateGameCommandHandler(
		IRegisteredGamesRepository registeredGamesRepository,
		IAnonymousGamesRepository anonymousGamesRepository,
		IProfilesRepository profilesRepository,
		IRandomProvider randomProvider,
		IDateTimeProvider dateTimeProvider)
	{
		_registeredGamesRepository = registeredGamesRepository;
		_anonymousGamesRepository = anonymousGamesRepository;
		_profilesRepository = profilesRepository;
		_randomProvider = randomProvider;
		_dateTimeProvider = dateTimeProvider;
	}

	public async Task<Result<CreateGameResponse>> Handle(CreateGameCommand request, CancellationToken cancellationToken)
	{
		if (request.BoardSize < BOARD_MIN_SIZE || request.BoardSize > BOARD_MAX_SIZE)
		{
			return Result.Invalid(new ValidationError($"Board size cannot be less than {BOARD_MIN_SIZE} and more than {BOARD_MAX_SIZE}"));
		}

		var isCreatedByAnonymousPlayer = request.PlayerId == null;

		if (isCreatedByAnonymousPlayer)
		{
			var playerId = Guid.NewGuid().ToString();
			var tempAnonymousProfile = new Profile(playerId, $"Guest {playerId[..6]}");

			var anonymousGame = new Game(request.BoardSize, _randomProvider, _dateTimeProvider);
			anonymousGame.AddOpponent(tempAnonymousProfile);

			var saveAnonymousResult = await _anonymousGamesRepository.SaveAsync(anonymousGame);
			if (saveAnonymousResult.Status != ResultStatus.Ok)
			{
				return Result.Error();
			}

			return Result.Success(new CreateGameResponse(anonymousGame.GameId, request.BoardSize, tempAnonymousProfile.Id));
		}

		var getPlayerResult = await _profilesRepository.GetAsync(request.PlayerId!);
		if (!getPlayerResult.IsSuccess)
		{
			return Result.Error("Cannot get user by id. See logs for more details");
		}

		var game = new Game(request.BoardSize, _randomProvider, _dateTimeProvider);
		game.AddOpponent(getPlayerResult.Value);

		var saveResult = await _registeredGamesRepository.SaveAsync(game);
		if (saveResult.Status != ResultStatus.Ok)
		{
			return Result.Error();
		}

		return Result.Success(new CreateGameResponse(game.GameId, request.BoardSize, request.PlayerId!));
	}
}
