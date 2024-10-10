using GomokuServer.Application.Common.Interfaces;
using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Application.Games.Responses;

namespace GomokuServer.Application.Games.Queries;

public class GetGameHistoryQuery : IQuery<GetGameHistoryResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public class GetGameHistoryQueryHandler : IQueryHandler<GetGameHistoryQuery, GetGameHistoryResponse>
{
	private readonly IGamesRepository _gameRepository;

	public GetGameHistoryQueryHandler(IGamesRepository gameRepository)
	{
		_gameRepository = gameRepository;
	}

	public async Task<Result<GetGameHistoryResponse>> Handle(GetGameHistoryQuery request, CancellationToken cancellationToken)
	{
		var getGameResult = await _gameRepository.GetAsync(request.GameId);

		return getGameResult.Map(game => new GetGameHistoryResponse()
		{
			BoardSize = game.BoardSize,
			MovesCount = game.MovesHistory.Count,
			Players = new UsernamesDto() { Black = game.Players.Black?.UserName, White = game.Players.White?.UserName },
			MovesHistory = game.MovesHistory.ToDictionary(
				keyValuePair => keyValuePair.Key,
				keyValuePair => new TileDto(keyValuePair.Value.X, keyValuePair.Value.Y)
			)
		});
	}
}
