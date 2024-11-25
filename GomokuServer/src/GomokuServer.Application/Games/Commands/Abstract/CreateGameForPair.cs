namespace GomokuServer.Application.Games.Commands.Abstract;

public record CreateGameForPairCommand : ICommand<CreateGameResponse>
{
	[Required] public required int BoardSize { get; init; }
	public required TimeControlDto TimeControl { get; init; }
	public bool Anonymous { get; init; }

	public required string FirstPlayerId { get; init; }
	public required string SecondPlayerId { get; init; }
}

public class CreateGameForPairCommandHandler(
	IDateTimeProvider _dateTimeProvider,
	IAnonymousGamesRepository _anonymousGamesRepository,
	IRegisteredGamesRepository _registeredGamesRepository)
	: ICommandHandler<CreateGameForPairCommand, CreateGameResponse>
{
	private const int BoardMinSize = 13;
	private const int BoardMaxSize = 19;

	public virtual async Task<Result<CreateGameResponse>> Handle(CreateGameForPairCommand request, CancellationToken cancellationToken)
	{
		if (request.BoardSize < BoardMinSize || request.BoardSize > BoardMaxSize)
		{
			return Result.Invalid(
				new ValidationError($"Board size cannot be less than {BoardMinSize} and more than {BoardMaxSize}"));
		}

		var gameSettings = new GameWithTimeControlSettings()
		{
			BoardSize = request.BoardSize,
			TimeControl = new TimeControl(request.TimeControl.InitialTimeInSeconds,
				request.TimeControl.IncrementPerMove)
		};

		var players = new Players(
			new Player(request.FirstPlayerId, request.FirstPlayerId, TileColor.White),
			new Player(request.SecondPlayerId, request.SecondPlayerId, TileColor.Black));

		var game = new GameWithTimeControl(gameSettings, players, _dateTimeProvider) { GameId = Guid.NewGuid() };

		var saveResult = request.Anonymous
			? await _anonymousGamesRepository.SaveAsync(game)
			: await _registeredGamesRepository.SaveAsync(game);

		return saveResult.Map(_ => new CreateGameResponse(game.GameId.ToString(), request.BoardSize));
	}
}
