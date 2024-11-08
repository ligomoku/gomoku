namespace GomokuServer.Application.Games.Queries;

// TODO: Remove. This is duplication of GetGameHistoryQuery logic and is unused anymore.
// TODO: Figure out if all tests in history are covered same as this handler tests
public record GetGameCurrentStateQuery : IQuery<GetGameCurrentStateResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public class GetGameCurrentStateQueryHandler(IRegisteredGamesRepository _registeredGamesRepository, IAnonymousGamesRepository _anonymousGamesRepository)
	: IQueryHandler<GetGameCurrentStateQuery, GetGameCurrentStateResponse>
{
	public async Task<Result<GetGameCurrentStateResponse>> Handle(GetGameCurrentStateQuery request, CancellationToken cancellationToken)
	{
		var getGameResult = await _registeredGamesRepository.GetAsync(request.GameId);

		if (!getGameResult.IsSuccess)
		{
			getGameResult = await _anonymousGamesRepository.GetAsync(request.GameId);
		}

		return getGameResult.Map(game => new GetGameCurrentStateResponse
		{
			GameId = game.GameId,
			Players = game.GetPlayersDto(),
			HasBothPlayersJoined = game.Status != GameStatus.WaitingForPlayersToJoin,
			IsGameStarted = game.Status == GameStatus.InProgress || game.Status == GameStatus.Completed,
			NextMoveShouldMakePlayerId = game.CurrentPlayer?.Id,
			Winner = game.Winner != null ? new PlayerDto(game.Winner.Id, game.Winner.UserName, game.Winner.Color.ToString()) : null,
			WinningSequence = game.WinningSequence?.Select(tile => new TileDto(tile.X, tile.Y)),
			MovesCount = game.MovesHistory.Count,
			MovesHistory = game.MovesHistory.ToDictionary(
				keyValuePair => keyValuePair.Key,
				keyValuePair => new TileDto(keyValuePair.Value.X, keyValuePair.Value.Y)
			)
		});
	}
}
