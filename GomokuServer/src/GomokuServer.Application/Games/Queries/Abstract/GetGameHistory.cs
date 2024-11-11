namespace GomokuServer.Application.Games.Queries.Abstract;

public abstract record GetGameHistoryQuery : IQuery<GetGameHistoryResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public abstract class GetGameHistoryQueryHandler<TRequest>(IGamesRepository _gamesRepository, IPlayersAwaitingGameRepository _playersAwaitingGameRepository)
	: IQueryHandler<TRequest, GetGameHistoryResponse>
		where TRequest : GetGameHistoryQuery
{
	public async Task<Result<GetGameHistoryResponse>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var gameId = Guid.Parse(request.GameId);

		var getGameResult = await _gamesRepository.GetAsync(gameId);

		if (getGameResult.IsNotFound())
		{
			var getPlayersAwaitingGameResult = await _playersAwaitingGameRepository.GetAsync(gameId);
			return getPlayersAwaitingGameResult.Map(GetEmptyHistoryResponse);
		}

		return getGameResult.Map(game =>
		{
			var (timeControl, clock) = game is GameWithTimeControl gameWithTimeControl
				? (
					gameWithTimeControl.GameSettings.TimeControl.ToDto(),
					new ClockDto(gameWithTimeControl.BlackRemainingTimeInMilliseconds / 1000, gameWithTimeControl.WhiteRemainingTimeInMilliseconds / 1000)
				)
				: (null, null);

			return new GetGameHistoryResponse()
			{
				BoardSize = game.GameSettings.BoardSize,
				Gen = game.PositionInGENFormat,
				MovesCount = game.MovesHistory.Count,
				Players = game.GetPlayersDto(),
				IsGameStarted = game.Status == GameStatus.InProgress || game.Status == GameStatus.Completed,
				HasBothPlayersJoined = true,
				IsCompleted = game.Status == GameStatus.Completed,
				Winner = game.Winner?.UserName,
				WinningSequence = game.WinningSequence?.Select(tile => new TileDto(tile.X, tile.Y)).ToList(),
				MovesHistory = game.MovesHistory.ToDictionary(
					keyValuePair => keyValuePair.Key,
					keyValuePair => new TileDto(keyValuePair.Value.X, keyValuePair.Value.Y)
				),
				TimeControl = timeControl,
				Clock = clock
			};
		});
	}

	private GetGameHistoryResponse GetEmptyHistoryResponse(PlayersAwaitingGame playersAwaitingGame)
	{
		return new GetGameHistoryResponse()
		{
			BoardSize = playersAwaitingGame.GameSettings.BoardSize,
			Gen = GameBoard.GetEmptyBoardGEN(playersAwaitingGame.GameSettings.BoardSize),
			MovesCount = 0,
			Players = PlayersDto.Empty(), // From history point of view players are assigned only when both players are joined
			IsGameStarted = false,
			HasBothPlayersJoined = false,
			IsCompleted = false,
			Winner = null,
			WinningSequence = null,
			MovesHistory = new Dictionary<int, TileDto>(),
			TimeControl = TimeControlDto.FromDomainEntity(playersAwaitingGame.GameSettings.TimeControl),
			Clock = ClockDto.GetInitialClock(playersAwaitingGame.GameSettings.TimeControl),
		};
	}
}
