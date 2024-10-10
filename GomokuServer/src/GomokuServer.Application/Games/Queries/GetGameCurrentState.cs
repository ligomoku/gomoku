using GomokuServer.Application.Extensions;

namespace GomokuServer.Application.Games.Queries;

public record GetGameCurrentStateQuery : IQuery<GetGameCurrentStateResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public class GetGameCurrentStateQueryHandler : IQueryHandler<GetGameCurrentStateQuery, GetGameCurrentStateResponse>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymusGamesRepository _anonymusGamesRepository;

	public GetGameCurrentStateQueryHandler(IRegisteredGamesRepository gameRepository, IAnonymusGamesRepository anonymusGamesRepository)
	{
		_registeredGamesRepository = gameRepository;
		_anonymusGamesRepository = anonymusGamesRepository;
	}

	public async Task<Result<GetGameCurrentStateResponse>> Handle(GetGameCurrentStateQuery request, CancellationToken cancellationToken)
	{
		var getGameResult = await _registeredGamesRepository.GetAsync(request.GameId);

		if (!getGameResult.IsSuccess)
		{
			getGameResult = await _anonymusGamesRepository.GetAsync(request.GameId);
		}

		return getGameResult.Map(game => new GetGameCurrentStateResponse
		{
			GameId = game.GameId,
			Players = game.GetPlayersDto(),
			HasBothPlayersJoined = game.HasBothPlayersJoined,
			IsGameStarted = game.IsGameStarted,
			NextMoveShouldMakePlayerId = game.NextMoveShouldMakePlayerId,
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
