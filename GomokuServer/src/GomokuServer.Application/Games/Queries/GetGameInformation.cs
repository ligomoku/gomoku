using GomokuServer.Application.Extensions;
using GomokuServer.Application.Interfaces.Common;
using GomokuServer.Application.Responses;

namespace GomokuServer.Application.Games.Queries;

public record GetGameInformationQuery : IQuery<GetGameResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public class GetGameInformationQueryHandler : IQueryHandler<GetGameInformationQuery, GetGameResponse>
{
	private readonly IGameRepository _gameRepository;

	public GetGameInformationQueryHandler(IGameRepository gameRepository)
	{
		_gameRepository = gameRepository;
	}

	public async Task<Result<GetGameResponse>> Handle(GetGameInformationQuery request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gameRepository.GetAsync(request.GameId);

		return getGameResult.Map(game => new GetGameResponse
		{
			GameId = game.GameId,
			Players = game.GetPlayersDto(),
			HasBothPlayersJoined = game.HasBothPlayersJoined,
			IsGameStarted = game.IsGameStarted,
			NextMoveShouldMakePlayerId = game.NextMoveShouldMakePlayerId,
			Winner = game.Winner != null ? new PlayerDto(game.Winner.Id, game.Winner.UserName, game.Winner.Color?.ToString()) : null,
			WinningSequence = game.WinningSequence?.Select(tile => new TileDto(tile.X, tile.Y)),
			MovesCount = game.MovesHistory.Count,
			MovesHistory = game.MovesHistory.ToDictionary(
				keyValuePair => keyValuePair.Key,
				keyValuePair => new TileDto(keyValuePair.Value.X, keyValuePair.Value.Y)
			)
		});
	}
}
