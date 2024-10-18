using GomokuServer.Application.Extensions;
using GomokuServer.Core.Games.Enums;

namespace GomokuServer.Application.Games.Queries;

public class GetGameHistoryQuery : IQuery<GetGameHistoryResponse>
{
	[Required]
	public required string GameId { get; init; }
}

public class GetGameHistoryQueryHandler : IQueryHandler<GetGameHistoryQuery, GetGameHistoryResponse>
{
	private readonly IRegisteredGamesRepository _registeredGamesRepository;
	private readonly IAnonymousGamesRepository _anonymousGamesRepository;

	public GetGameHistoryQueryHandler(IRegisteredGamesRepository gameRepository, IAnonymousGamesRepository anonymousGamesRepository)
	{
		_registeredGamesRepository = gameRepository;
		_anonymousGamesRepository = anonymousGamesRepository;
	}

	public async Task<Result<GetGameHistoryResponse>> Handle(GetGameHistoryQuery request, CancellationToken cancellationToken)
	{
		var getGameResult = await _registeredGamesRepository.GetAsync(request.GameId);

		if (!getGameResult.IsSuccess)
		{
			getGameResult = await _anonymousGamesRepository.GetAsync(request.GameId);
		}

		return getGameResult.Map(game =>
		{
			var (timeControl, clock) = game is GameWithTimeControl gameWithTimeControl
				? (
					gameWithTimeControl.TimeControl.ToDto(),
					new ClockDto(gameWithTimeControl.BlackRemainingTimeInSeconds, gameWithTimeControl.WhiteRemainingTimeInSeconds)
				)
				: (null, null);

			return new GetGameHistoryResponse()
			{
				BoardSize = game.BoardSize,
				Gen = game.PositionInGENFormat,
				MovesCount = game.MovesHistory.Count,
				Players = new UsernamesDto() { Black = game.Players.Black?.UserName, White = game.Players.White?.UserName },
				IsCompleted = game.Status == GameStatus.Completed,
				Winner = game.Winner?.UserName,
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
