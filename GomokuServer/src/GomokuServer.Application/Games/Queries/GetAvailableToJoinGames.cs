using System.Linq.Expressions;

using GomokuServer.Application.Common.Interfaces;
using GomokuServer.Application.Common.Responses;
using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Application.Games.Responses;

namespace GomokuServer.Application.Games.Queries;

public record GetAvailableToJoinGamesQuery
	: IPaginatedQuery<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>
{
	public int Limit { get; init; } = 5;
	public int Offset { get; init; } = 0;
}

public class GetAvailableToJoinGamesQueryHandler
	: IQueryHandler<GetAvailableToJoinGamesQuery, PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>
{
	private readonly IGamesRepository _gameRepository;

	public GetAvailableToJoinGamesQueryHandler(IGamesRepository gameRepository)
	{
		_gameRepository = gameRepository;
	}

	public async Task<Result<PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>>>
	Handle(GetAvailableToJoinGamesQuery request, CancellationToken cancellationToken)
	{
		Expression<Func<Game, bool>> expression =
			game => !game.HasBothPlayersJoined;

		var availableGamesCount = await _gameRepository.CountAsync(expression);

		var getAvailableGamesResult = await _gameRepository.GetByExpressionAsync(expression,
			query => query
				.Skip(request.Offset)
				.Take(request.Limit)
				.OrderByDescending(game => game.CreatedAt)
		);


		return getAvailableGamesResult.Map(games =>
		{
			var availableGames = games.Select(game =>
			{
				var opponent = game.Opponents[0];
				var opponentDto = new ProfileDto(opponent.Id, opponent.UserName);

				return new GetAvailableGamesResponse(game.GameId, opponentDto);
			}).ToList();

			return new PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>()
			{
				Data = availableGames,
				Metadata = new PaginationMetadata
				{
					HasMoreItems = request.Offset + request.Limit < availableGamesCount,
					TotalCount = availableGamesCount
				}
			};
		});
	}
}
