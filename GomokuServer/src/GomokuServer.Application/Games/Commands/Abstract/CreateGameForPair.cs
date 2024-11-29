using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.Games.Commands.Abstract;

public abstract class CreateGameForPairCommandHandler<TRequest>(
	IDateTimeProvider dateTimeProvider,
	IGamesRepository gamesRepository,
	IRandomProvider randomProvider)
	: ICommandHandler<TRequest, CreateGameResponse> where TRequest : CreateGameForPairCommand 
{
	private const int BoardMinSize = 13;
	private const int BoardMaxSize = 19;

	public virtual async Task<Result<CreateGameResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		if (request.BoardSize is < BoardMinSize or > BoardMaxSize)
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

		var firstUserProfile = await GetProfileAsync(request.FirstPlayerId);
		var secondUserProfile = await GetProfileAsync(request.SecondPlayerId);

		if (!firstUserProfile.IsSuccess || !secondUserProfile.IsSuccess)
		{
			return Result.Error("Failed to fetch user profile.");
		}

		// would be nice to encapsulate this in Players class.
		var random = randomProvider.GetInt(0, int.MaxValue);
		Profile[] playerProfiles = [firstUserProfile.Value, secondUserProfile.Value];
		var shuffledPlayerProfiles = playerProfiles.OrderBy(p => random).ToArray();
		
		var players = new Players(
			new Player(shuffledPlayerProfiles[0].Id, shuffledPlayerProfiles[0].UserName, TileColor.Black),
			new Player(shuffledPlayerProfiles[1].Id, shuffledPlayerProfiles[1].UserName, TileColor.White));

		var game = new GameWithTimeControl(gameSettings, players, dateTimeProvider) { GameId = Guid.NewGuid() };
		var saveResult = await gamesRepository.SaveAsync(game);
		
		return saveResult.Map(_ => new CreateGameResponse(game.GameId.ToString(), request.BoardSize));
	}

	protected abstract Task<Result<Profile>> GetProfileAsync(string userId);
}

public abstract record CreateGameForPairCommand : ICommand<CreateGameResponse>
{
	[Required] public required int BoardSize { get; init; }
	[Required] public required TimeControlDto TimeControl { get; init; }
	[Required] public required string FirstPlayerId { get; init; }
	[Required] public required string SecondPlayerId { get; init; }
	[Required] public required bool Anonymous { get; init; }
}
