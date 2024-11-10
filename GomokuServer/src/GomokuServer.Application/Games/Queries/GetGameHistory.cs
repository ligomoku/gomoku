namespace GomokuServer.Application.Games.Queries;

public class GetGameHistoryQuery : IQuery<GetGameHistoryResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public class GetGameHistoryQueryHandler(IRegisteredGamesRepository _registeredGamesRepository, IAnonymousGamesRepository _anonymousGamesRepository)
	: IQueryHandler<GetGameHistoryQuery, GetGameHistoryResponse>
{
	public async Task<Result<GetGameHistoryResponse>> Handle(GetGameHistoryQuery request, CancellationToken cancellationToken)
	{
		var gameId = Guid.Parse(request.GameId);

		var getGameResult = await _registeredGamesRepository.GetAsync(gameId);

		if (!getGameResult.IsSuccess)
		{
			getGameResult = await _anonymousGamesRepository.GetAsync(gameId);
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
}
