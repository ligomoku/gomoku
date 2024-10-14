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
			return await TryCreateGame(_anonymousGamesRepository, request);
		}

		var getProfile = await _profilesRepository.GetAsync(request.PlayerId!);
		if (!getProfile.IsSuccess)
		{
			return Result.Error("Cannot get user by id. See logs for more details");
		}

		return await TryCreateGame(_registeredGamesRepository, request);
	}

	private async Task<Result<CreateGameResponse>> TryCreateGame(IGamesRepository gamesRepository, CreateGameCommand request)
	{
		var game = new Game(request.BoardSize, _randomProvider, _dateTimeProvider);
		var saveResult = await gamesRepository.SaveAsync(game);
		return saveResult.Map(_ => new CreateGameResponse(game.GameId, game.BoardSize));
	}
}
